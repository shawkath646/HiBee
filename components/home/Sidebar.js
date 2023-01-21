import { AiOutlinePlus } from 'react-icons/ai';
import { HiLockClosed } from 'react-icons/hi';

export default function Sidebar({ setNewPostWindow, session }) {
    return (
        <div className="sticky bg-white dark:text-gray-200 dark:bg-gray-900 w-full h-[700px] top-28 rounded-sm shadow-xl">
            {!session && (
                <div className="absolute h-full w-full bg-white/50 dark:bg-black/50 flex items-center justify-center">
                    <div className="text-black dark:text-white">
                        <HiLockClosed size="lg" className="h-10 w-10 mx-auto" />
                        <p>Signin to unlock</p>
                    </div>
                </div>
            )}
            <div className="p-3 pt-10">
                <div>
                    <p className="pb-1 border-b font-bold">Your friends</p>
                    <div className="w-full h-14 bg-gray-200 dark:bg-gray-800 mt-1"></div>
                </div>
                <div className="text-center font-bold text-lg flex items-center justify-center space-x-2 pt-5">
                    <AiOutlinePlus size="lg" className="w-6 h-6" />
                    <p>Add what in your mind</p>
                </div>
                <button type="button" onClick={() => setNewPostWindow(true)} className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 transition-all hover:ring-4 outline-none hover:ring-blue-300 dark:hover:ring-blue-800 rounded text-sm py-2 text-center w-full leading-snug shadow hover:shadow-xl">NEW</button>
            </div>

        </div>
    );
}