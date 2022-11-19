import Link from 'next/link'
import { useState, Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import navTabs from '../server-config/navTabs';
import { HideScroll } from "react-hide-on-scroll";
import { AiOutlineSearch, AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { BiBrush } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { signOut } from "firebase/auth";
import { auth } from '../firebase'

export default function Navbar({ activeTab, searchText, setActiveTab, user, navSearch, theme, setTheme }) {


	return (
		<nav className="w-full fixed top-0 left-0 shadow-xl">
			<div className="bg-white dark:bg-gray-800 flex items-center justify-between p-2 lg:px-10">
				<Link href="/">
					<p className="text-2xl font-bold text-violet-600 dark:text-violet-400 cursor-pointer">HiBee</p>
				</Link>
				<div className="flex items-center space-x-6 lg:space-x-10">
					<div className="lg:hidden text-violet-600 dark:text-violet-400">
						<AiOutlineSearch size="lg" className="h-8 w-8" />
					</div>
					<div className="hidden lg:block relative text-violet-600 dark:text-violet-400">
						<AiOutlineSearch size="lg" className="absolute left-0 h-7 w-7" />
						<input type="text" placeholder="Search..." ref={searchText} className="pl-7 pb-1 bg-transparent border-b-2 border-violet-600 focus:ring-0 outline-none" />
					</div>
					{user ? (
						<Menu as="div" className="relative inline-block text-left">
							<Menu.Button type="button" className="">
								<img src={user.photoURL} alt="profile_img" className="h-10 w-10 rounded-full" />
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
								<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-black rounded-md bg-white dark:bg-gray-900 dark:text-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<Menu.Item>
										<Link href="/profile">
											<div className="group flex space-x-2 w-full items-center cursor-pointer rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-violet-900 transition-all">
												<CgProfile size="lg" className="h-4 w-4" />
												<p>Profile</p>
											</div>
										</Link>
									</Menu.Item>
									<Menu.Item>
										<button type="button" onClick={() => signOut(auth)} className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-violet-900 transition-all">
											<ImExit size="lg" className="h-4 w-4" />
											<p>Sign Out</p>
										</button>
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					) : (
						<div className="flex items-center space-x-3">
							<Link href="/signin">
								<div className="text-violet-600 dark:text-violet-400 cursor-pointer">
									<AiOutlineUser size="lg" className="w-8 h-8 lg:w-6 lg:h-6" />
									<p className="text-sm hidden lg:block">SignIn</p>
								</div>
							</Link>
							<Link href="/signup">
								<div className="text-violet-600 dark:text-violet-400 cursor-pointer">
									<AiOutlineUserAdd size="lg" className="w-8 h-8 lg:w-6 lg:h-6" />
									<p className="text-sm hidden lg:block">SignUp</p>
								</div>
							</Link>
						</div>
					)}
					<Menu as="div" className="relative inline-block text-left">
						<Menu.Button type="button" className="text-violet-700 hover:text-violet-800 transition-all">
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
							<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y  divide-gray-100 rounded-md bg-white dark:divide-black dark:text-gray-200 dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<Menu.Item>
									<button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-violet-900 transition-all">
										<BiBrush size="lg" className="h-4 w-4" />
										<p>Dark Mode</p>
									</button>
								</Menu.Item>
								<Menu.Item>
									<button type="button" className="group flex space-x-2 w-full items-center rounded-md px-2 py-2 hover:bg-gray-200 dark:hover:bg-violet-900 transition-all">
										<IoSettingsSharp size="lg" className="h-4 w-4" />
										<p>Settings</p>
									</button>
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
				<ul className="flex items-center overflow-auto bg-blue-900/20 bg-opacity-75 p-2 lg:px-10 space-x-5">
					{navTabs.map((e) => (
						<li key={e.id}>
							<button type="button" onClick={() => setActiveTab(e.id)} className={`min-w-[60px] shrink-0 py-1 rounded-lg hover:bg-whit transition-all font-medium leading-5 ${activeTab == e.id ? "bg-gray-400 bg-opacity-50 shadow-lg" : ""}`}>
								<p className="font-bold">{e.name}</p>
							</button>
						</li>
					))}
				</ul>
		</nav>
	);
}


