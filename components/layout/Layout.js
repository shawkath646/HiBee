import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import LeftSidebar from '../navigation/LeftSidebar';
import { isPathInclude } from '../../utilities/tools';
import hideComponent from "../../server-config/hideComponent"
import useWindowSize from '../../utilities/useWindowSize';

export default function Layout ({ children }) {
    // useEffect(() => {
    //     const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    //     const previousTheme = (localStorage.getItem('theme'));
    //     previousTheme === "system" ? (systemTheme ? setTheme("dark") : setTheme("light")) : setTheme(previousTheme);
    // }, []);
    const windowSize = useWindowSize();

    return (
        <>
            {!isPathInclude(hideComponent.hideNavbar) && <Navbar />}
                {(!isPathInclude(hideComponent.hideLeftSidebar) && windowSize.width >= 1280) && <LeftSidebar />}
                <main className={`min-h-screen ${!isPathInclude(hideComponent.hideNavbar) ? "pt-[50px]" : ""}`}>{children}</main>
            {!isPathInclude(hideComponent.hideFooter) && <Footer />}
        </>
    );
}