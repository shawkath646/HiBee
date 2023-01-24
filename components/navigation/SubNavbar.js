import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';
import navTabs from '../../server-config/navTabs';
import featuresIcon from '../../server-config/FeaturesIcon';

export default function SubNavbar() {
  
  const [navTabShow, setNavTabShow] = useState(true);
  
  var lastPos = 0;
  const router = useRouter();
  
  useEffect(() => {
		window.addEventListener("scroll", handleScroll);
    	return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	
	const NavTabsItemTop = ({e}) => {
		const Icon = featuresIcon[e.iconName];
		return (
			<li>
				<button type="button" disabled={!e.enabled} onClick={() => router.push(e.path)} className={`min-w-[60px] shrink-0 p-1 transition-all font-medium leading-5 ring-0 outline-none rounded-sm flex space-x-1 items-center justify-center disabled:text-gray-400 ${router.pathname == e.path ? " bg-blue-500 hover:bg-blue-700 text-white" : "hover:bg-blue-500 hover:bg-opacity-50 text-black dark:text-gray-200"}`}>
					{Icon && <Icon size="lg" className="h-5 w-5" />}
					<p>{e.name}</p>
				</button>
			</li>
		);
	}


	const handleScroll = () => {
		let current_pos = window.scrollY;
		current_pos > lastPos ? setNavTabShow(false) : setNavTabShow(true);
		lastPos = current_pos;
	}
  return (
    <Transition
					show={navTabShow}
					as="ul"
					enter="transition ease duration-100 transform"
					enterFrom="-translate-y-12"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease duration-100 transform"
					leaveFrom="translate-y-0"
					leaveTo="-translate-y-12"
					className="flex items-center overflow-auto backdrop-blur p-2 lg:px-10 space-x-5 relative -z-[1]"
				>
					{navTabs.map((e, k) => <NavTabsItemTop e={e} key={k} />)}
				</Transition>
  );
}