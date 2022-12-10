import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import navTabs from '../server-config/navTabs';
import { lockScroll, unlockScroll } from '../utilities/tools';
import { AiOutlineSearch, AiOutlineUser, AiOutlineUserAdd, AiOutlineQuestionCircle } from "react-icons/ai";
import { BsHeadset } from "react-icons/bs";
import { BiBrush } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";



export default function Navbar() {

  	const [navTabShow, setNavTabShow] = useState(true);
	const [searchPopUp, setSearchPopUp]= useState(false);
	const [navSearchItem, setNavSearchItem] = useState([]);
	const [user] = useAuthState(auth);
	
	const router = useRouter();
	const { theme, setTheme } = useTheme();

	var lastPos = 0;

	const handleScroll = () => {
		let current_pos = window.scrollY;
		current_pos > lastPos ? setNavTabShow(false) : setNavTabShow(true);
		lastPos = current_pos;
	}

	const navSearch = (e) => {
		let searchText = e.target.value;
		let searchResults = searchText.split("");
		setNavSearchItem(searchResults);
		console.log(searchResults);
	}



	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
    	return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	
	return (
		<>
			<nav className="w-full fixed top-0 left-0">
				<div className="bg-white relative dark:bg-gray-800 flex items-center justify-between p-2 lg:px-10 z-50 shadow-xl">
					<Link href="/">
						<p className="text-2xl font-bold text-emerald-500 cursor-pointer">HiBee</p>
					</Link>
					<div className="flex items-center space-x-2 lg:space-x-4">
						<button type="button" onClick={() => {setSearchPopUp(true); lockScroll();}} className="lg:hidden text-emerald-500">
							<AiOutlineSearch size="lg" className="h-8 w-8" />
						</button>
						<Menu as="div" className="hidden lg:block relative">
							<AiOutlineSearch size="lg" className="absolute left-0 h-7 w-7 text-emerald-500" />
							<input type="text" placeholder="Search..." onChange={(e) => navSearch(e)} className="pl-8 pb-1 bg-transparent border-b-2 border-emerald-500 focus:ring-0 outline-none" />
							<Transition
								show={navSearchItem.length > 0}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 mt-2 w-96 origin-top-right divide-y divide-gray-100 dark:divide-black rounded-md bg-white dark:bg-gray-900 dark:text-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									{navSearchItem.map((e, i) => (
										<Menu.Item as="div" key={i}>
											<div className="group flex space-x-2 w-full items-center cursor-pointer rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-emerald-600 transition-all">
												<p>{e}</p>
											</div>
										</Menu.Item>
									))}
								</Menu.Items>
							</Transition>
						</Menu>
						{user ? (
							<Image src={user.photoURL} alt="profile_img" height="38" width="38" className="rounded-full" />

						) : (
							<div className="flex items-center space-x-3">
								<Link href="/signin" className="flex items-center font-medium text-emerald-500 hover:text-emerald-600 cursor-pointer">
									<AiOutlineUser size="lg" className="w-8 h-8 lg:w-6 lg:h-6" />
									<p className="text-sm hidden lg:block">SignIn</p>
								</Link>
								<Link href="/signup" className="flex items-center font-medium text-emerald-500 hover:text-emerald-600 cursor-pointer">
									<AiOutlineUserAdd size="lg" className="w-8 h-8 lg:w-6 lg:h-6" />
									<p className="text-sm hidden lg:block">SignUp</p>
								</Link>
							</div>
						)}
						<Menu as="div" className="relative inline-block text-left">
							<Menu.Button type="button" className="text-emerald-500 hover:text-emerald-600 transition-all">
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
										<Link href="/profile" className="group flex space-x-2 w-full items-center cursor-pointer rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-emerald-600 transition-all">
											<CgProfile size="lg" className="h-4 w-4" />
											<p>Profile</p>
										</Link>
									</Menu.Item>
									<Menu.Item>
										<button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-emerald-700 transition-all">
											<BiBrush size="lg" className="h-4 w-4" />
											<p>Dark Mode</p>
										</button>
									</Menu.Item>
									<Menu.Item>
										<Link href="/settings" className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-emerald-700 transition-all">
											<IoSettingsSharp size="lg" className="h-4 w-4" />
											<p>Settings</p>
										</Link>
									</Menu.Item>
									<Menu.Item>
										<Link href="/helps" className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-emerald-700 transition-all">
											<AiOutlineQuestionCircle size="lg" className="h-4 w-4" />
											<p>Helps</p>
										</Link>
									</Menu.Item>
									<Menu.Item>
										<Link href="/live-support" className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-emerald-700 transition-all">
											<BsHeadset size="lg" className="h-4 w-4" />
											<p>Live Support</p>
										</Link>
									</Menu.Item>
									<Menu.Item>
										<button type="button" onClick={() => signOut(auth)} className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-emerald-600 transition-all">
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
					show={navTabShow}
					enter="transition ease duration-100 transform"
					enterFrom="-translate-y-12"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease duration-100 transform"
					leaveFrom="translate-y-0"
					leaveTo="-translate-y-12"
				>
					<ul className="flex items-center overflow-auto bg-emerald-900/50 backdrop-blur p-2 lg:px-10 space-x-5 z-40">
						{navTabs.map((e) => (
							<li key={e.id}>
								<button type="button" disabled={!e.enabled} onClick={() => router.push(e.path)} className={`min-w-[60px] shrink-0 py-1 rounded transition-all font-medium leading-5 text-white  hover:bg-gray-500 dark:hover:bg-emerald-400 hover:bg-opacity-25 disabled:text-gray-400 ${router.pathname == e.path ? "bg-gray-500 dark:bg-emerald-500 bg-opacity-50" : ""}`}>
									<p>{e.name}</p>
								</button>
							</li>
						))}
					</ul>
				</Transition>
			</nav>
			<Transition
                show={searchPopUp}
                className="fixed top-0 left-0 z-[60] w-full"
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div onClick={() => {setSearchPopUp(false); unlockScroll()}} className="absolute h-screen bg-black bg-opacity-50 w-full z-[61]"></div>
                <Menu as="div" className="relative z-[62]">
                    <div className="bg-white dark:bg-gray-800 flex items-center space-x-8 py-3 px-5 w-full">
                        <input type="text" placeholder="Search..." autoFocus onChange={(e) => navSearch(e)} className="pb-1 w-full bg-transparent border-b-2 border-emerald-500 focus:ring-0 outline-none" />
                        <button type="button">
                            <AiOutlineSearch size="lg" className="h-7 w-7 mx-3 text-emerald-500" />
                        </button>
                    </div>
                    <Transition
                        show={navSearchItem.length > 0}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-full origin-top-right divide-y divide-gray-100 dark:divide-black rounded-md bg-white dark:bg-gray-900 dark:text-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {navSearchItem.map((e, i) => (
                                <Menu.Item as="div" key={i}>
                                    <div className="group flex space-x-2 w-full items-center cursor-pointer rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-emerald-600 transition-all">
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


