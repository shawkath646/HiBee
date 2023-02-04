import Image from 'next/image';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import profilePicGenerator from '../../utilities/profilePicGenerator';

export default function PublicProfile() {

    const user = {};

    return (
        <div className="max-w-7xl mx-auto">
            <div className="relative">
                <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 relative">
                    {user?.userInfo?.coverPhoto && <Image src={user?.userInfo?.coverPhoto} alt="" fill />}
                </div>

                <div className="border-4 border-blue-500 rounded-full h-44 w-44 absolute left-10 -bottom-20">
                    <Image src={profilePicGenerator(user?.userInfo?.profilePic, user?.userInfo?.gender)} alt="" fill />
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin"
            }
        }
    }
    return {
      props: {
        stringySession: JSON.stringify(session),
      }
    }
}