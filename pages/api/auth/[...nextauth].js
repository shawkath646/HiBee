import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import HiBeeFirebaseAdapter from "../../../utilities/HiBeeFirebaseAdapter/HiBeeFirebaseAdapter";

const firebaseConfig = {
    apiKey: "AIzaSyBOc6asFqCIYFWiMGXdlk4hAODbYKBT_Ko",
    authDomain: "hibee-f47cd.firebaseapp.com",
    projectId: "hibee-f47cd",
    storageBucket: "hibee-f47cd.appspot.com",
    messagingSenderId: "783184179766",
    appId: "1:783184179766:web:e16a901207ce0d6cffde97",
    measurementId: "G-FNGGND151R"
  };


export default NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        }),
        FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
        })
    ],
    secret: process.env.AUTH_SECRET,
    adapter: HiBeeFirebaseAdapter(firebaseConfig),
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
    },
    callbacks: {
        async session({ session, token, user }) {
          session.user.username = session.user.name.split(" ").join("-").toLocaleLowerCase();
          // session.user.uid = token.sub;
          return session;
        },
    }
});
