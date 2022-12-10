import Link from 'next/link'
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Transition } from '@headlessui/react';
import { FaRegNewspaper } from "react-icons/fa";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { RiMovieLine, RiBookLine } from "react-icons/ri";
import navTabs from '../server-config/navTabs';
import introductionComponentBG from "./images/3185953.jpg";


export default function IntroductionComponent() {

    const { theme } = useTheme();
    const emailRef = useRef();

    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // const FeaturesItems = () => {
    //     const icons = {
    //         FaRegNewspaper: FaRegNewspaper,
    //         BsFileEarmarkPostFill: BsFileEarmarkPostFill,
    //         RiMovieLine: RiMovieLine,
    //         RiBookLine: RiBookLine
    //     }

    //     const L = navTabs.map((e, k) => {
    //         const iconName = e.iconName;
    //         const Icon = icons[iconName];
    //         (
    //             <Link key={k} href={e.path} className="rounded mx-auto hover:scale-90 transition-all bg-gradient-to-tr bg-opacity-25 h-16 w-full px-3 from-blue-500/50 via-sky-500/50 to-emerald-500/50 space-x-4 flex items-center">
    //                 <Icon size="lg" className="h-8 w-8" />
    //                 <p className="text-xl">{e.name}</p>
    //             </Link>
    //         )
    //     });

    //     return L;
    // }


    return (
        <div>
            <Transition show={isMounted} appear={true} as="div" className="componentBg min-h-[800px] grid lg:grid-cols-2 text-white">
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <Transition.Child
                            enter="transition ease-out duration-[2s]"
                            enterFrom="transform opacity-0 translate-y-20"
                            enterTo="transform opacity-100 translate-y-0"
                            leave="transition ease-in duration-[2s]"
                            leaveFrom="transform opacity-100 translate-y-0"
                            leaveTo="transform opacity-0 translate-y-20"
                            className="my-10 lg:my-0"
                        >
                            <p className="text-7xl leading-tight">Welcome to</p>
                            <p className="font-bold text-7xl text-emerald-600">HiBee</p>
                            <p className="mt-8 text-2xl text-blue-300">Your best social assistant.</p>
                            <p className="mt-10 text-left leading-tight text-base text-teal-300">Your all neccessery features in 1 app</p>
                        </Transition.Child>
                        <Transition.Child
                            enter="transition ease-out duration-[2s] delay-[1s]"
                            enterFrom="transform opacity-0 translate-x-20"
                            enterTo="transform opacity-100 translate-x-0"
                            leave="transition ease-in duration-[2s] delay-[1s]"
                            leaveFrom="transform opacity-100 translate-x-0"
                            leaveTo="transform opacity-0 translate-x-20"
                            className="grid gap-1 grid-cols-2 text-center mt-5"
                        >
                            {/* <FeaturesItems /> */}
                        </Transition.Child>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="space-y-5">
                        <p className="text-5xl">Join us today !</p>
                        <p>It's totally free.</p>
                        <div className="space-x-2 flex">
                            <input type="email" placeholder="Email" ref={emailRef} className="py-1 px-2 outline-none bg-white rounded-sm text-pink-600 font-medium" />
                            <Link href={"/signup"} className="px-2 rounded bg-emerald-500 font-medium leading-8">
                                Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </Transition>
            <style jsx global>{`
                .componentBg {
                    background-image: linear-gradient(90deg, rgb(0, 0, 0, 0.8), rgb(0, 0, 0, ${theme === "dark" ? 0.8 : 0.2})), url(${introductionComponentBG.src});
                }
            `}</style>
        </div>
    );
}