import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

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
            async authorize(credentials, req) {
                console.log(credentials);
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