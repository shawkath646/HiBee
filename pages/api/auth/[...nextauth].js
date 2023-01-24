import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDoc, doc } from "firebase/firestore";
import { db } from '../../../firebase';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req, res) {
              const userName = credentials.email.replace(/@.*$/,"");
              const userSnap  = await getDoc(doc(db, 'users', userName));
                if(userSnap.exists()) {
                  return userSnap.data();
                };
              res.status(404).json({ error: "User not exists" });
            }
        })
    ],
    pages:{
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        newUser: '/auth/signup',
        error: '/auth/error',
    }
}

export default NextAuth(authOptions)