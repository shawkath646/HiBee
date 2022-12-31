import getConverter from './converter';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, withConverter, query, limit, where, runTransaction, setDoc, deleteDoc } from 'firebase/firestore';

export default function FirestoreAdapter(firebaseConfig) {

    const app = !getApps().length > 0 ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);

    const users = collection(db, 'users').withConverter(getConverter());
    const accounts = collection(db, 'accounts').withConverter(getConverter());
    const sessions = collection(db, 'sessions').withConverter(getConverter());
    const VerificationTokens = collection(db, 'verificationTokens').withConverter(getConverter());
    
    return {
        async createUser(user) {
            const userRef = await addDoc(users, user);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists() && users.converter) {
                return users.converter.fromFirestore(userSnapshot);
            } else {
                throw new Error("[createUser] Failed to create user");
            }
            
        },
        async getUser(id) {
            const userSnapshot = await getDoc(users, id);
            if (userSnapshot.exists() && users.converter) {
                return users.converter.fromFirestore(userSnapshot);
            }
            return null;
        },
        async getUserByEmail(email) {
            const userQuery = query(users, where("email", "==", email), limit(1));
            const userSnapshots = getDocs(userQuery);
            const userSnapshot = userSnapshots.docs;
            if (userSnapshot === null || userSnapshot === void 0 ? void 0 : userSnapshot.exists() && users.converter) {
                return users.converter.fromFirestore(userSnapshot);
            }
            return null;
        },
        async getUserByAccount({ providerAccountId, provider }) {
            const accountQuery = query(accounts, where("provider", "==", provider), where("providerAccountId", "==", providerAccountId), limit(1));
            const accountSnapshots = await getDocs(accountQuery);
            const accountSnapshot = accountSnapshots.docs[0];
            if (accountSnapshot === null || accountSnapshot === void 0 ? void 0 : accountSnapshot.exists()) {
                const { userId } = accountSnapshot.data();
                const userDoc = await getDoc(doc(users, userId));
                if (userDoc.exists() && users.converter) {
                    return users.converter.fromFirestore(userDoc);
                }
            }
            return null;
        },
        async updateUser(user) {
            const userRef = doc(users, user.id);
            await userRef, user, { merge: true };
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists() && users.converter) {
                return users.converter.fromFirestore(userSnapshot);
            }
            throw new Error("[updateUser] Failed to update user");
        },
        async deleteUser(userId) {
            const userRef = doc(users, userId);
            const accountsQuery = query(accounts, where("userId", "==", userId));
            const sessionsQuery = query(sessions, where("userId", "==", userId));
            await runTransaction(db, async (transaction) => {
                const accounts2 = await getDocs(accountsQuery);
                const sessions2 = await getDocs(sessionsQuery);
                transaction.delete(userRef);
                accounts2.forEach((account) => transaction.delete(account.ref));
                sessions2.forEach((session) => transaction.delete(session.ref));
            })
        },
        async linkAccount(account) {
            const accountRef = await addDoc(accounts, account);
            const accountSnapshot = await getDoc(accountRef);
            if (accountSnapshot.exists() && accounts.converter) {
                return accounts.converter.fromFirestore(accountSnapshot);
            }
        },
        async unlinkAccount({ providerAccountId, provider }) {
            const accountQuery = query(accounts, where("provider", "==", provider), where("providerAccountId", "==", providerAccountId), limit(1));
            const accountSnapshots = await getDocs(accountQuery);
            const accountSnapshot = accountSnapshots.docs[0];
            if (accountSnapshot === null || accountSnapshot.exists()) {
                await deleteDoc(accountSnapshot.ref);
            }
        },
        async createSession(session) {
            const sessionRef = await addDoc(sessions, session);
            const sessionSnapshot = await getDoc(sessionRef);
            if (sessionSnapshot.exists() && sessions.converter) {
                return sessions.converter.fromFirestore(sessionSnapshot);
            }
            throw new Error("[createSession] Failed to create session");
        },
        async getSessionAndUser(sessionToken) {
            const sessionQuery = query(sessions, where("sessionToken", "==", sessionToken), limit(1));
            const sessionSnapshots = await getDocs(sessionQuery);
            const sessionSnapshot = sessionSnapshots.docs[0];
            if ((sessionSnapshot === null || sessionSnapshot === void 0 ? void 0 : sessionSnapshot.exists()) && sessions.converter) {
                const session = sessions.converter.fromFirestore(sessionSnapshot);
                const userDoc = await getDoc(doc(users, session.userId));
                if (userDoc.exists() && users.converter) {
                    const user = users.converter.fromFirestore(userDoc);
                    return { session, user };
                }
            }
            return null;
        },
        async updateSession(partialSession) {
            const sessionQuery = query(sessions, where("sessionToken", "==", partialSession.sessionToken), limit(1));
            const sessionSnapshots = await getDocs(sessionQuery);
            const sessionSnapshot = sessionSnapshots.docs[0];
            if (sessionSnapshot === null || sessionSnapshot.exists()) {
                await setDoc(sessionSnapshot.ref, partialSession, { merge: true });
                const sessionDoc = await getDoc(sessionSnapshot.ref);
                if ((sessionDoc === null || sessionDoc.exists()) && sessions.converter) {
                    const session = sessions.converter.fromFirestore(sessionDoc);
                    return session;
                }
            }
            return null;
        },
        async deleteSession(sessionToken) {
            console.log("ll4")
            const sessionQuery = query(sessions, where("sessionToken", "==", sessionToken), limit(1));
            const sessionSnapshots = await getDocs(sessionQuery);
            const sessionSnapshot = sessionSnapshots.docs[0];
            if (sessionSnapshot === null || sessionSnapshot.exists()) {
                await deleteDoc(sessionSnapshot.ref);
            }
        },
        async createVerificationToken(verificationToken) {
            const verificationTokenRef = await addDoc(VerificationTokens, verificationToken);
            const verificationTokenSnapshot = await getDoc(verificationTokenRef);
            if (verificationTokenSnapshot.exists() && VerificationTokens.converter) {
                const { id, ...verificationToken } = VerificationTokens.converter.fromFirestore(verificationTokenSnapshot);
                return verificationToken;
            }
        },
        async useVerificationToken({ identifier, token }) {
            const verificationTokensQuery = query(VerificationTokens, where("identifier", "==", identifier), where("token", "==", token), limit(1));
            const verificationTokenSnapshots = await getDocs(verificationTokensQuery);
            const verificationTokenSnapshot = verificationTokenSnapshots.docs[0];
            if ((verificationTokenSnapshot === null || verificationTokenSnapshot === verificationTokenSnapshot.exists()) && VerificationTokens.converter) {
                await deleteDoc(verificationTokenSnapshot.ref);
                const { id, ...verificationToken } = VerificationTokens.converter.fromFirestore(verificationTokenSnapshot);
                return verificationToken;
            }
            return null;
        },
    }
}