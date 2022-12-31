import Link from "next/link";
import Image from "next/image";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { BsBook, BsArrowRight } from "react-icons/bs";
import noThumbnail from "./images/image-preview-icon-picture-placeholder-vector-31284806.webp";

export default function PostTemplate({ data, user }) {
    return (
        <div className="h-[400px] rounded shadow">
            <div className="h-44 relative">
                <Image src={data?.postData?.img || noThumbnail.src} alt="" fill className="object-cover" />
            </div>
            <div className="px-4 py-1 text-black dark:text-gray-200">
                <p className="font-medium text-xl my-1 truncate">{data.title}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3 text-sm font-bold mb-2">
                        <div className="flex items-center space-x-1 text-emerald-500">
                            <AiFillEye size="lg" className="h-4 w-4" />
                            <p>400</p>
                        </div>
                        <div className="flex items-center space-x-1 text-pink-500">
                            <AiFillHeart size="lg" className="h-4 w-4" />
                            <p>100</p>
                        </div>
                        <div className="flex items-center space-x-1 text-blue-500">
                            <BsBook size="lg" className="h-4 w-4" />
                            <p>300</p>
                        </div>
                    </div>
                    <Link href={`/${data.userId}`} className="flex items-center space-x-1">
                        {user && <Image src={user?.photoURL} alt="User image" height="25" width="25" className="rounded-full object-cover" />}
                        <p className="text-sm text-sky-500 font-semibold rounded-md truncate">SH MARUF</p>
                    </Link>
                </div>
                <div className="h-[112px]">
                    <p className="line-clamp-4">{data.body}</p>
                </div>
                <Link href={`/${data.userId}/stories/${data.id}/`} className="bg-blue-600 text-sm rounded font-semibold text-white dark:text-gray-200 py-1 text-center hover:bg-blue-800 transition-all flex items-center justify-between px-2">
                    <div></div>
                    <p>View</p>
                    <BsArrowRight size="lg" className="h-5 w-5" />
                </Link>
            </div>
        </div>
    );
}