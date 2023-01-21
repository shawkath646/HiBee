import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiWorld } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { IoIosArrowDown, IoMdCloudUpload } from "react-icons/io";

export default function NewPost() {

    const [data, setData] = useState({
        thumbnail: null,
        title: "",
        timeStamp: null,
        privacy: "public",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {!true ? (
                <img src={''} alt="Post thumbnail" className="w-full h-[200px] rounded-sm" />
            ) : (
                <div className="bg-gray-300 w-full h-[200px] dark:bg-gray-800 flex items-center justify-center">
                    <button className="leading-snug text-black dark:text-gray-500 font-medium">
                        <IoMdCloudUpload size="lg" className="w-10 h-10 mx-auto" />
                        <p>Upload</p>
                    </button>
                </div>
            )}
            <div className="flex items-center justify-between">
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="w-full justify-center rounded-md text-sm text-black dark:text-gray-200 font-semibold flex items-center space-x-1 hover:bg-opacity-30">
                        <p>Privacy</p>
                        <IoIosArrowDown size="lg" className="w-5 h-5" />
                    </Menu.Button>
                    <Transition
                        as="div"
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item as="div" className="group flex w-full items-center rounded-md space-x-1 font-semibold py-2 pl-2 transition-all hover:bg-gray-200">
                                <p>Public</p>
                                <BiWorld size="lg" className="h-5 w-5" />
                            </Menu.Item>
                            <Menu.Item as="div" className="group flex w-full items-center rounded-md space-x-1 font-semibold py-2 pl-2 transition-all hover:bg-gray-200">
                                <p>Friends</p>
                                <BsFillPeopleFill size="lg" className="h-5 w-5" />
                            </Menu.Item>
                            <Menu.Item as="div" className="group flex w-full items-center rounded-md space-x-1 font-semibold py-2 pl-2 transition-all hover:bg-gray-200">
                                <p>Only Me</p>
                                <HiLockClosed size="lg" className="h-5 w-5" />
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
                {data.thumbnail ? (
                    <button type="button" className="py-1.5 px-4 space-x-1 bg-blue-700 rounded-sm hover:bg-blue-900 transition-all text-white flex items-center">
                        <p>Change</p>
                        <IoMdCloudUpload size="lg" className="w-5 h-5" />
                    </button>
                ) : (
                    <div></div>
                )}
            </div>
            <div className="space-y-1">
                <label className="block font-bold">Title :</label>
                <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="border-b border-blue-700 rounded-sm bg-transparent ring-0 outline-none w-full p-2" />
            </div>
            <button type="submit" className="text-sm shadow bg-blue-700 text-white leading-snug font-semibold w-full block py-2.5 rounded transition-all hover:bg-blue-900 hover:shadow-xl">POST</button>
        </form>
    );
}