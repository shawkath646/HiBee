import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { isPathInclude } from '../utilities/tools';
import hideComponent from "../server-config/hideComponent"



export default function Layout ({ children }) {
    const { setTheme } = useTheme();

    // useEffect(() => {
    //     const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    //     const previousTheme = (localStorage.getItem('theme'));
    //     previousTheme === "system" ? (systemTheme ? setTheme("dark") : setTheme("light")) : setTheme(previousTheme);
    // }, []);

    return (
        <>
            {!isPathInclude(hideComponent.hideNavbar) && <Navbar />}
                <main className={`bg-gray-200 dark:bg-gray-800 ${!isPathInclude(hideComponent.hideNavbar) ? "pt-[50px]" : ""}`}>{children}</main>
            {!isPathInclude(hideComponent.hideFooter) && <Footer />}
        </>
    );
}