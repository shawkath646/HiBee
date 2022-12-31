"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreAdapter = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const converter_1 = require("./converter");
function FirestoreAdapter({ emulator, firebaseApp, ...firebaseOptions }) {
    var _a, _b;
    //const firebaseApp = (0, app_1.initializeApp)(firebaseOptions);
    const db = (0, firestore_1.getFirestore)(firebaseApp);
    if (emulator) {
        (0, firestore_1.connectFirestoreEmulator)(db, (_a = emulator === null || emulator === void 0 ? void 0 : emulator.host) !== null && _a !== void 0 ? _a : "localhost", (_b = emulator === null || emulator === void 0 ? void 0 : emulator.port) !== null && _b !== void 0 ? _b : 3001);
    }
    const Users = (0, firestore_1.collection)(db, "users").withConverter((0, converter_1.getConverter)());
    const Sessions = (0, firestore_1.collection)(db, "sessions").withConverter((0, converter_1.getConverter)());
    const Accounts = (0, firestore_1.collection)(db, "accounts").withConverter((0, converter_1.getConverter)());
    const VerificationTokens = (0, firestore_1.collection)(db, "verificationTokens").withConverter((0, converter_1.getConverter)({ excludeId: true }));
    return {
        async createUser(newUser) {
            const userRef = await (0, firestore_1.addDoc)(Users, newUser);
            const userSnapshot = await (0, firestore_1.getDoc)(userRef);
            if (userSnapshot.exists() && Users.converter) {
                return Users.converter.fromFirestore(userSnapshot);
            }
            throw new Error("[createUser] Failed to create user");
        },
        async getUser(id) {
            const userSnapshot = await (0, firestore_1.getDoc)((0, firestore_1.doc)(Users, id));
            if (userSnapshot.exists() && Users.converter) {
                return Users.converter.fromFirestore(userSnapshot);
            }
            return null;
        },
        async getUserByEmail(email) {
            const userQuery = (0, firestore_1.query)(Users, (0, firestore_1.where)("email", "==", email), (0, firestore_1.limit)(1));
            const userSnapshots = await (0, firestore_1.getDocs)(userQuery);
            const userSnapshot = userSnapshots.docs[0];
            if ((userSnapshot === null || userSnapshot === void 0 ? void 0 : userSnapshot.exists()) && Users.converter) {
                return Users.converter.fromFirestore(userSnapshot);
            }
            return null;
        },
        async getUserByAccount({ provider, providerAccountId }) {
            const accountQuery = (0, firestore_1.query)(Accounts, (0, firestore_1.where)("provider", "==", provider), (0, firestore_1.where)("providerAccountId", "==", providerAccountId), (0, firestore_1.limit)(1));
            const accountSnapshots = await (0, firestore_1.getDocs)(accountQuery);
            const accountSnapshot = accountSnapshots.docs[0];
            if (accountSnapshot === null || accountSnapshot === void 0 ? void 0 : accountSnapshot.exists()) {
                const { userId } = accountSnapshot.data();
                const userDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(Users, userId));
                if (userDoc.exists() && Users.converter) {
                    return Users.converter.fromFirestore(userDoc);
                }
            }
            return null;
        },
        async updateUser(partialUser) {
            const userRef = (0, firestore_1.doc)(Users, partialUser.id);
            await (0, firestore_1.setDoc)(userRef, partialUser, { merge: true });
            const userSnapshot = await (0, firestore_1.getDoc)(userRef);
            if (userSnapshot.exists() && Users.converter) {
                return Users.converter.fromFirestore(userSnapshot);
            }
            throw new Error("[updateUser] Failed to update user");
        },
        async deleteUser(userId) {
            const userRef = (0, firestore_1.doc)(Users, userId);
            const accountsQuery = (0, firestore_1.query)(Accounts, (0, firestore_1.where)("userId", "==", userId));
            const sessionsQuery = (0, firestore_1.query)(Sessions, (0, firestore_1.where)("userId", "==", userId));
            // TODO: May be better to use events instead of transactions?
            await (0, firestore_1.runTransaction)(db, async (transaction) => {
                const accounts = await (0, firestore_1.getDocs)(accountsQuery);
                const sessions = await (0, firestore_1.getDocs)(sessionsQuery);
                transaction.delete(userRef);
                accounts.forEach((account) => transaction.delete(account.ref));
                sessions.forEach((session) => transaction.delete(session.ref));
            });
        },
        async linkAccount(account) {
            const accountRef = await (0, firestore_1.addDoc)(Accounts, account);
            const accountSnapshot = await (0, firestore_1.getDoc)(accountRef);
            if (accountSnapshot.exists() && Accounts.converter) {
                return Accounts.converter.fromFirestore(accountSnapshot);
            }
        },
        async unlinkAccount({ provider, providerAccountId }) {
            const accountQuery = (0, firestore_1.query)(Accounts, (0, firestore_1.where)("provider", "==", provider), (0, firestore_1.where)("providerAccountId", "==", providerAccountId), (0, firestore_1.limit)(1));
            const accountSnapshots = await (0, firestore_1.getDocs)(accountQuery);
            const accountSnapshot = accountSnapshots.docs[0];
            if (accountSnapshot === null || accountSnapshot === void 0 ? void 0 : accountSnapshot.exists()) {
                await (0, firestore_1.deleteDoc)(accountSnapshot.ref);
            }
        },
        async createSession(session) {
            const sessionRef = await (0, firestore_1.addDoc)(Sessions, session);
            const sessionSnapshot = await (0, firestore_1.getDoc)(sessionRef);
            if (sessionSnapshot.exists() && Sessions.converter) {
                return Sessions.converter.fromFirestore(sessionSnapshot);
            }
            throw new Error("[createSession] Failed to create session");
        },
        async getSessionAndUser(sessionToken) {
            const sessionQuery = (0, firestore_1.query)(Sessions, (0, firestore_1.where)("sessionToken", "==", sessionToken), (0, firestore_1.limit)(1));
            const sessionSnapshots = await (0, firestore_1.getDocs)(sessionQuery);
            const sessionSnapshot = sessionSnapshots.docs[0];
            if ((sessionSnapshot === null || sessionSnapshot === void 0 ? void 0 : sessionSnapshot.exists()) && Sessions.converter) {
                const session = Sessions.converter.fromFirestore(sessionSnapshot);
                const userDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(Users, session.userId));
                if (userDoc.exists() && Users.converter) {
                    const user = Users.converter.fromFirestore(userDoc);
                    return { session, user };
                }
            }
            return null;
        },
        async updateSession(partialSession) {
            const sessionQuery = (0, firestore_1.query)(Sessions, (0, firestore_1.where)("sessionToken", "==", partialSession.sessionToken), (0, firestore_1.limit)(1));
            const sessionSnapshots = await (0, firestore_1.getDocs)(sessionQuery);
            const sessionSnapshot = sessionSnapshots.docs[0];
            if (sessionSnapshot === null || sessionSnapshot === void 0 ? void 0 : sessionSnapshot.exists()) {
                await (0, firestore_1.setDoc)(sessionSnapshot.ref, partialSession, { merge: true });
                const sessionDoc = await (0, firestore_1.getDoc)(sessionSnapshot.ref);
                if ((sessionDoc === null || sessionDoc === void 0 ? void 0 : sessionDoc.exists()) && Sessions.converter) {
                    const session = Sessions.converter.fromFirestore(sessionDoc);
                    return session;
                }
            }
            return null;
        },
        async deleteSession(sessionToken) {
            const sessionQuery = (0, firestore_1.query)(Sessions, (0, firestore_1.where)("sessionToken", "==", sessionToken), (0, firestore_1.limit)(1));
            const sessionSnapshots = await (0, firestore_1.getDocs)(sessionQuery);
            const sessionSnapshot = sessionSnapshots.docs[0];
            if (sessionSnapshot === null || sessionSnapshot === void 0 ? void 0 : sessionSnapshot.exists()) {
                await (0, firestore_1.deleteDoc)(sessionSnapshot.ref);
            }
        },
        async createVerificationToken(verificationToken) {
            const verificationTokenRef = await (0, firestore_1.addDoc)(VerificationTokens, verificationToken);
            const verificationTokenSnapshot = await (0, firestore_1.getDoc)(verificationTokenRef);
            if (verificationTokenSnapshot.exists() && VerificationTokens.converter) {
                const { id, ...verificationToken } = VerificationTokens.converter.fromFirestore(verificationTokenSnapshot);
                return verificationToken;
            }
        },
        async useVerificationToken({ identifier, token }) {
            const verificationTokensQuery = (0, firestore_1.query)(VerificationTokens, (0, firestore_1.where)("identifier", "==", identifier), (0, firestore_1.where)("token", "==", token), (0, firestore_1.limit)(1));
            const verificationTokenSnapshots = await (0, firestore_1.getDocs)(verificationTokensQuery);
            const verificationTokenSnapshot = verificationTokenSnapshots.docs[0];
            if ((verificationTokenSnapshot === null || verificationTokenSnapshot === void 0 ? void 0 : verificationTokenSnapshot.exists()) && VerificationTokens.converter) {
                await (0, firestore_1.deleteDoc)(verificationTokenSnapshot.ref);
                const { id, ...verificationToken } = VerificationTokens.converter.fromFirestore(verificationTokenSnapshot);
                return verificationToken;
            }
            return null;
        },
    };
}
exports.FirestoreAdapter = FirestoreAdapter;
