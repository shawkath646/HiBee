import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, Fragment, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes';
import useWindowSize from '../../utilities/useWindowSize';
import { lockScroll, unlockScroll } from '../../utilities/tools';
import ToggleButton from '../ui/ToggleButton';
import navTabs from '../../server-config/navTabs';
import featuresIcon from '../../server-config/FeaturesIcon';



import { AiOutlineUser, AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";
import { BsFillGearFill, BsFillMoonFill, BsQuestionCircle } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { TfiHeadphoneAlt } from "react-icons/tfi";







export default function Navbar() {

  	const [navTabShow, setNavTabShow] = useState(true);
	const [searchPopUp, setSearchPopUp]= useState(false);
	const [navSearchItem, setNavSearchItem] = useState({
		searchText: "",
		searchItem: []
	});
	
	const router = useRouter();
	const windowSize = useWindowSize();
	const { theme, setTheme } = useTheme();

	const { data: session } = useSession();

	var lastPos = 0;

	const handleScroll = () => {
		let current_pos = window.scrollY;
		current_pos > lastPos ? setNavTabShow(false) : setNavTabShow(true);
		lastPos = current_pos;
	}

	const navSearch = (e) => {
		let searchText = e.target.value;
		let searchResults = searchText.split("");
		setNavSearchItem({ searchText: searchText, searchItem: searchResults});
		console.log(navSearchItem)
	}

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

	

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
    	return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	
	return (
		<>
			<nav className="w-full fixed top-0 left-0 z-[9990]">
				<div className="bg-white dark:bg-gray-800 flex items-center justify-between p-2 lg:px-10 shadow-xl">
					<Link href="/">
						<p className="text-2xl font-bold text-blue-500 cursor-pointer">HiBee</p>
					</Link>
					<div className="flex items-center space-x-3 lg:space-x-4">
						{windowSize.width >= 768 && <Menu as="div" className="relative">
							<AiOutlineSearch size="lg" className="absolute left-0 h-5 w-5 text-blue-500" />
							<input type="text" placeholder="Search..." value={navSearchItem.searchText} onChange={(e) => navSearch(e)} className="pl-8 pb-1 bg-transparent border-b-2 border-blue-500 focus:ring-0 outline-none" />
							<Transition
								show={navSearchItem.searchItem.length > 0}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 mt-2 w-96 origin-top-right divide-y divide-gray-100 dark:divide-black rounded-md bg-white dark:bg-gray-900 dark:text-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									{navSearchItem.searchItem.map((e, i) => (
										<Menu.Item as="div" key={i}>
											<div className="group flex space-x-2 w-full items-center cursor-pointer rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-blue-600 transition-all">
												<p>{e}</p>
											</div>
										</Menu.Item>
									))}
								</Menu.Items>
							</Transition>
						</Menu>}
						{session ? (
							<Image src={session.user.image} alt="profile_img" height="40" width="40" className="rounded-full border-2 p-0.5 scale-105 border-gray-300 dark:border-gray-900" />

						) : (
							<div className="flex items-center justify-center space-x-2">
								<div onClick={() => signIn()} className="flex items-center font-medium text-blue-500 hover:text-blue-600 cursor-pointer">
									<AiOutlineUser size="lg" className="w-8 h-8 lg:w-6 lg:h-6" />
									<p className="text-sm hidden lg:block">SignIn</p>
								</div>
								<Link href="/auth/signup" className="flex items-center font-medium text-blue-500 hover:text-blue-600 cursor-pointer">
									<AiOutlineUserAdd size="lg" className="w-8 h-8 lg:w-6 lg:h-6" />
									<p className="text-sm hidden lg:block">SignUp</p>
								</Link>
							</div>
						)}
						{windowSize.width < 768 && <button type="button" onClick={() => {setSearchPopUp(true); lockScroll();}} className="text-blue-500">
							<AiOutlineSearch size="lg" className="h-8 w-8" />
						</button>}
						<Menu as="div" className="relative inline-block text-left">
							<Menu.Button type="button" className="text-blue-500 hover:text-blue-600 transition-all outline-none ring-0">
								<FaBars size="lg" className="h-8 w-8" />
							</Menu.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y  divide-gray-100 rounded-md bg-white dark:divide-black dark:text-gray-200 dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-medium">
									<Menu.Item>
										<Link href="/profile" className="group flex space-x-2 w-full items-center cursor-pointer rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-blue-600 transition-all">
											<HiOutlineUserCircle size="lg" className="h-4 w-4" />
											<p>Profile</p>
										</Link>
									</Menu.Item>
									<Menu.Item as="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="group flex w-full items-center justify-between rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-blue-700 transition-all">
										<div className="flex items-center space-x-2">
											<BsFillMoonFill size="lg" className="h-4 w-4" />
											<p>Dark Mode</p>
										</div>
										<ToggleButton checked={theme === "dark"} />
									</Menu.Item>
									<Menu.Item>
										<Link href="/settings" className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-blue-700 transition-all">
											<BsFillGearFill size="lg" className="h-4 w-4" />
											<p>Settings</p>
										</Link>
									</Menu.Item>
									<Menu.Item>
										<Link href="/helps" className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-blue-700 transition-all">
											<BsQuestionCircle size="lg" className="h-4 w-4" />
											<p>Helps</p>
										</Link>
									</Menu.Item>
									<Menu.Item>
										<Link href="/live-support" className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-blue-700 transition-all">
											<TfiHeadphoneAlt size="lg" className="h-4 w-4" />
											<p>Live Support</p>
										</Link>
									</Menu.Item>
									<Menu.Item>
										<button onClick={() => signOut()} className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-blue-600 transition-all">
											<ImExit size="lg" className="h-4 w-4" />
											<p>Sign Out</p>
										</button>
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
				<Transition
					show={navTabShow && windowSize.width < 1080}
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
			</nav>
			<Transition
                show={searchPopUp && windowSize.width < 768}
                className="fixed top-0 left-0 z-[9992] w-full"
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div onClick={() => {setSearchPopUp(false); unlockScroll()}} className="absolute h-screen bg-black bg-opacity-50 w-full"></div>
                <Menu as="div" className="relative ">
                    <div className="bg-white dark:bg-gray-800 flex items-center space-x-8 py-3 px-5 w-full">
                        <input type="text" placeholder="Search..." autoFocus value={navSearchItem.searchText} onChange={(e) => navSearch(e)} className="pb-1 w-full bg-transparent border-b-2 border-blue-500 focus:ring-0 outline-none" />
                        <button type="button">
                            <AiOutlineSearch size="lg" className="h-7 w-7 mx-3 text-blue-500" />
                        </button>
                    </div>
                    <Transition
                        show={navSearchItem.searchItem.length > 0}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-full origin-top-right divide-y divide-gray-100 dark:divide-black bg-white dark:bg-gray-900 dark:text-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {navSearchItem.searchItem.map((e, i) => (
                                <Menu.Item as="div" key={i}>
                                    <div className="group flex space-x-2 w-full items-center cursor-pointer rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-blue-600 transition-all">
                                        <p>{e}</p>
                                    </div>
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </Transition>
		</>
	);
}


