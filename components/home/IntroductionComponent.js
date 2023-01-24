import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import sideVectorImage from "../../public/assets/—Pngtree—floating people connecting piece puzzle_7537095.png";

export default function IntroductionComponent() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white dark:bg-gray-900 pt-[180px] pb-16 lg:pb-0 lg:pt-0">
            <section className="flex items-center justify-center">
                <div className="text-center">
                    <p className="text-7xl mb-5">Welcome to</p>
                    <p className="font-bold text-8xl">H<span className="text-blue-500">i</span>Bee</p>
                    <p className="mt-3 mb-5 text-xl">Your best social assistant</p>
                    <Link href="/auth/signup" className="rounded py-2 px-8 bg-blue-500 text-white transition-all font-medium hover:bg-blue-600">Join with us !</Link>
                    <div className="mt-3 flex space-x-3 items-center">
                        <p>Already have an account ?</p>
                        <button onClick={() => signIn()} className="rounded-sm py-1 px-2 text-blue-500">Signin</button>
                    </div>
                </div>
            </section>
            <section className="flex items-center justify-center">
                <div>
                    <Image alt="Introduction  Side Vector" src={sideVectorImage.src} height="500" width="500" />
                    <p className="text-center text-xl">Stay connect together</p>
                </div>
            </section>
        </div>
    );
}

