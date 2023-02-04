import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

export default function SignOut({ stringySession }) {

    const session = JSON.parse(stringySession);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
            <div className="">
                <p>Youre signed in with</p>
                <p className="text-sm">{session.email}</p>
                <button type="button" className="text-white dark:text-gray-200 bg-pink-500 rounded shadow-xl transition-all hover:bg-pink-700 flex items-center justify-center space-x-2">
                    <p>Sign Out</p>
                </button>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );
  
    if (!session) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        }
      }
    }
    return {
      props: {
        stringySession: JSON.stringify(session),
      }
    }
}