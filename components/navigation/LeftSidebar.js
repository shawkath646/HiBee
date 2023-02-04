import Link from "next/link";
import navTabs from '../../server-config/navTabs';
import featuresIcon from '../../server-config/FeaturesIcon';
import { useRouter } from "next/router";


export default function LeftSidebar() {

    const router = useRouter();

    const LeftTabs = ({e}) => {
        const Icon = featuresIcon[e.iconName];
        return (
            <Link href={e.path} className={`p-3 text-center rounded-full bg-white text-black dark:text-gray-200 dark:bg-gray-800 shadow-xl transition-all hover:shadow-2xl h-[70px] w-[65px] ${router.pathname === e.path ? "scale-75" : "hover:scale-95 active:scale-90"}`}>
                {Icon && <Icon size="lg" className="h-6 w-6 mx-auto" />}
                <p className="text-sm">{e.name}</p>
            </Link>
        );
    }

    return (
        <nav className="flex fixed items-center space-y-6 left-0 top-1/4 flex-col px-2 z-[9990]">
            {navTabs.map((e, k) => <LeftTabs e={e} key={k} />)}
        </nav>
    );
}
