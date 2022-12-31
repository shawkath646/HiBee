import { AiOutlinePlus } from 'react-icons/ai';

export default function Sidebar({ setNewPostWindow }) {
    return (
        <div className="sticky bg-white dark:text-gray-200 dark:bg-gray-900 w-full h-[700px] top-28 p-3 rounded-sm pt-10 shadow-xl">
            <div>
                <p className="pb-1 border-b font-bold">Your friends</p>
                <div className="w-full h-14 bg-gray-200 dark:bg-gray-800 mt-1"></div>
            </div>
            <div className="text-center font-bold text-lg flex items-center justify-center space-x-2 pt-5">
                <AiOutlinePlus size="lg" className="w-6 h-6" />
                <p>Add what in your mind</p>
            </div>
            <div className="mt-4 gap-3 grid grid-cols-1 2xl:grid-cols-3">
                <button type="button" onClick={() => setNewPostWindow({ state: true, type: "post" })} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 transition-all hover:ring-4 outline-none hover:ring-blue-300 dark:hover:ring-blue-800 font-semibold rounded text-sm py-2 text-center w-full leading-snug">NEW POST</button>
                <button type="button" onClick={() => setNewPostWindow({ state: true, type: "article" })} className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:ring-4 outline-none hover:ring-purple-200 dark:hover:ring-purple-800 py-2 rounded text-white w-full transition-all leading-snug">NEW STORY</button>
                <button type="button" onClick={() => setNewPostWindow({ state: true, type: "clip" })} className="text-sm font-semibold bg-gradient-to-br from-green-400 to-blue-600 hover:ring-4 outline-none hover:ring-green-200 dark:hover:ring-green-800 py-2 rounded text-white w-full transition-all leading-snug">NEW CLIP</button>
            </div>
        </div>
    );
}