import Link from 'next/link'
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Transition } from '@headlessui/react';
import navTabs from '../server-config/navTabs';
import featuresIcon from '../server-config/FeaturesIcon';
import introductionComponentBG from "./images/3185953.jpg";


export default function IntroductionComponent() {

    const [isMounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const emailRef = useRef();

    useEffect(() => {
        setMounted(true);
    }, []);

    
    const FeaturesItems = ({e}) => {
      if(!e.enabled) return null;
      const Icon = featuresIcon[e.iconName];
      return (
        <Link href={e.path} className="rounded mx-auto hover:scale-90 transition-all bg-gradient-to-tr bg-opacity-25 h-16 w-full px-3 from-blue-500/50 via-sky-500/50 to-emerald-500/50 space-x-4 flex items-center">
          {Icon ? <Icon size="lg" className="h-8 w-8" /> : <div className="h-8 w-8"></div>}
          <p className="text-xl">{e.name}</p>
        </Link>
      );
    };


    return (
        <Transition
            show={isMounted}
            appear={true}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            style={{backgroundImage: `linear-gradient(90deg, rgb(0, 0, 0, 0.8), rgb(0, 0, 0, ${isMounted ? (theme === "dark" ? 0.8 : 0.2) : 0.2})), url(${introductionComponentBG.src})`}}
            className="min-h-[800px] grid lg:grid-cols-2 text-white mb-16"
        >
            <div className="flex items-center justify-center">
                <div className="text-center">
                    <Transition.Child
                        enter="transition ease-in-out duration-[1s] transform"
                        enterFrom="translate-y-full opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-[1s] transform"
                        leaveFrom="opacity-100"
                        leaveTo="translate-y-full opacity-0"
                        className="my-10 lg:my-0"
                    >
                        <p className="text-7xl leading-tight">Welcome to</p>
                        <p className="font-bold text-7xl text-emerald-600">HiBee</p>
                        <p className="mt-8 text-2xl text-blue-300">Your best social assistant.</p>
                        <p className="mt-10 text-left leading-tight text-base text-teal-300">Your all neccessery features in 1 app</p>
                    </Transition.Child>
                    <Transition.Child
                        enter="transition ease-in-out duration-[1s] transform delay-[0.5s]"
                        enterFrom="-translate-x-full opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-[1s] transform delay-[0.5s]"
                        leaveFrom="opacity-100"
                        leaveTo="-translate-x-full opacity-0"
                        className="grid gap-1 grid-cols-2 text-center mt-5"
                    >
                        {navTabs.map((e, key) => <FeaturesItems key={key} e={e} />)}
                    </Transition.Child>
                </div>
            </div>
            <Transition.Child
                enter="transition-opacity ease-linear duration-[1s] delay-[1s]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-[1s] delay-[1s]"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="flex items-center justify-center"
            >
                <div className="space-y-5">
                    <p className="text-5xl">Join us today !</p>
                    <p>It<span>&#39;</span>s totally free.</p>
                    <div className="space-x-2 flex">
                        <input type="email" placeholder="Email" ref={emailRef} className="py-1 px-2 outline-none bg-white rounded-sm text-pink-600 font-medium" />
                        <Link href={"/signup"} className="px-2 rounded bg-emerald-500 font-medium leading-8">
                            Signup
                        </Link>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
}
