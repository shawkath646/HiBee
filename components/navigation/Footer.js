export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900">
            <div className="px-0 lg:px-24 pt-3">
                <p className="text-3xl font-bold pb-2 text-emerald-500 border-b-2 px-1 border-emerald-500 ">HiBee</p>
                <div className="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Company</h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className=" hover:underline">About</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Careers</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Brand Center</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Blog</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Help center</h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Discord Server</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Twitter</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Facebook</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Legal</h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Privacy Policy</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Licensing</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Download</h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">iOS</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Android</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Windows</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">MacOS</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-center py-3 font-medium">
                © 2022 Copyrighted by <span className="text-blue-400">M Products</span>
            </div>
        </footer>
    );
}