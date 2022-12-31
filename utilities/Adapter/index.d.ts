import type { FirebaseOptions } from "firebase/app";
import type { Adapter } from "next-auth/adapters";
export declare type IndexableObject = Record<string, unknown>;
export interface FirestoreAdapterOptions {
    emulator?: {
        host?: string;
        port?: number;
    };
}
export declare function FirestoreAdapter({ emulator, firebaseApp, ...firebaseOptions }: FirebaseOptions & FirestoreAdapterOptions): Adapter;
