import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from '../../../firebase';
import { compare } from "bcrypt";
import { emailToUsername } from "../../../utilities/tools";

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
        const userRef = await getDocs(query(collection(db, 'users'), where('email', '==', credentials.email)));
        if (userRef.empty) throw new Error("User not exists !");
        const data = userRef.docs[0].data();
        const passwordCorrect = await compare(credentials.password, data.secureInfo.password);
        if (!passwordCorrect) throw new Error("Email or password is incorrect !");
        return {
          name: data.name,
          email: data.email,
          image: data.image
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    newUser: '/auth/signup',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user, token }) {
      session.user.name = emailToUsername(session.user.email);
      const userRef = await getDocs(query(collection(db, 'users'), where('name', '==', session.user.name)));
      if (!userRef.empty) {
        session.user = userRef.docs[0].data();
        session.user.secureInfo = null;
      };
      session.user.token = token.sub;
      return session;
    },
  }
}

export default NextAuth(authOptions)