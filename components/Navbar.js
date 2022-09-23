import Link from 'next/link'
import { useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineSearch, AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from '../firebase'

export default function Navbar({activeTab, searchText, setActiveTab, setSearchText, user, navSearch}) {
  const [profilePicPopUp, setProfilePicPopUp] = useState(false);
  return (
    <nav className="w-full fixed top-0 left-0 shadow-xl">
      <div className="text-blue-600 bg-white border-b">
        <div className="max-w-5xl mx-auto flex justify-between items-center py-2 px-3 lg:px-0">
          <p className="text-2xl font-bold space-x-2 text-blue-700 px-1 rounded-lg">Hi Bee</p>
          <div className="flex border-b border-blue-600 pb-1 items-center space-x-2">
            <AiOutlineSearch size="lg" className="h-8 w-8" />
            <input type="text" value={searchText} placeholder="Search..." onChange={(e) => {setSearchText(e.target.value)}} onKeyUp={(e) => { e.keyCode == 13 && navSearch(searchText)}} className="bg-transparent outline-none text-emerald-600 placeholder-blue-600" />
          </div>
          {user ? (
            <Menu as="div" className="relative z-[99]">
              <Menu.Button onClick={() => setProfilePicPopUp(!profilePicPopUp)} onHover={() => setProfilePicPopUp(!profilePicPopUp)}>
                <img src={user.photoURL} className="h-10 w-10 object-cover rounded-full" />
              </Menu.Button>
              <Transition
                show={profilePicPopUp}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item as="div" className="p-2 flex items-center space-x-2">
                    <img src={user.photoURL} className="h-10 w-10 p-0.5 border-2 border-blue-600 rounded-full oobject-cover" />
                      <div>
                        <p className="font-semibold text-black">{user.displayName}</p>
                        <p className="text-sm text-gray-700">{user?.email}</p>
                      </div>
                  </Menu.Item>
                  <Menu.Item className="w-full">
                    <Link href="/profile">
                      <p className="text-black p-2 font-semibold">Profile</p>
                    </Link>
                  </Menu.Item>
                  <Menu.Item className="w-full text-black bg-violet-400 text-sm font-semibold px-2 py-2">
                    <button onClick={() => signOut(auth)}>Log Out</button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="flex space-x-2 items-center">
              <Link href="/signin">
                <AiOutlineUser size="lg" className="h-8 w-8" />
              </Link>
              <Link href="/signup">
                <AiOutlineUserAdd size="lg" className="h-8 w-8 hidden lg:block" />
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="bg-blue-200/30 backdrop-blur z-[50]">
        <ul className="max-w-5xl mx-auto flex space-x-3 items-center py-2 px-3 lg:px-0">
          <li onClick={() => setActiveTab(0)} className={`w-[90px] text-center ${activeTab == 0 && "font-semibold bg-black bg-opacity-25 rounded-lg px-2 py-1"}`}>ALL</li>
          <li onClick={() => setActiveTab(1)} className={`w-[90px] text-center ${activeTab == 1 && "font-semibold bg-black bg-opacity-25 rounded-lg px-2 py-1"}`}>Stories</li>
          <li onClick={() => setActiveTab(2)} className={`w-[90px] text-center ${activeTab == 2 && "font-semibold bg-black bg-opacity-25 rounded-lg px-2 py-1"}`}>News</li>
        </ul>
      </div>
    </nav>
  );
}


 // <-- import styles to be used
