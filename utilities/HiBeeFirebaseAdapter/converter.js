import { Timestamp } from 'firebase/firestore';

const isTimestamp = (value) =>  typeof value === "object" && value !== null && value instanceof Timestamp;
const getConverter = (options) => ({
    toFirestore(object) {
        const document = {};
        Object.keys(object).forEach((key) => {
            if (object[key] !== undefined) {
                document[key] = object[key];
            }
        });
        return document;
    },
    fromFirestore(snapshot) {
        if (!snapshot.exists()) {
            return snapshot;
        }
        let document = snapshot.data();
        if (!(options === null || options === void 0 ? void 0 : options.excludeId)) {
            document = {
                ...document,
                id: snapshot.id,
            };
        }
        for (const key in document) {
            const value = document[key];
            if (isTimestamp(value)) {
                document = {
                    ...document,
                    [key]: value.toDate(),
                };
            }
        }
        return document;
    },
});

export default getConverter;