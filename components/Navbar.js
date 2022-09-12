import Link from 'next/link'
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";

export default function Navbar({activeTab, searchText, setActiveTab, setSearchText, user, navSearch}) {
  
  return (
    <nav className="w-full fixed top-0 left-0">
      <div className="bg-emerald-400 text-white shadow-xl">
        <div className="max-w-5xl mx-auto flex justify-between items-center py-3 px-3 lg:px-0">
          <p className="text-2xl font-bold space-x-2 text-emerald-400 bg-white px-1 rounded-lg">Hi Bee</p>
          <div className="flex border-b border-white pb-1 items-center space-x-2">
            <AiOutlineSearch size="lg" className="h-8 w-8" />
            <input type="text" value={searchText} placeholder="Search..." onChange={(e) => {setSearchText(e.target.value)}} onKeyUp={(e) => { e.keyCode == 13 && navSearch(searchText)}} className="bg-transparent outline-none text-white placeholder-white" />
          </div>
          {user ? (
            <img src="" alt="" className="w-8 h-6 object-cover rounded-full" />
          ) : (
            <Link href="/auth">
              <AiOutlineUser size="lg" className="h-8 w-8" />
            </Link>
          )}
        </div>
      </div>
      <div className="bg-blue-200 shadow-xl">
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
