import { useRouter } from 'next/router';

const lockScroll = () => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
}

const unlockScroll = () => {
    document.body.style.overflow = "";
    document.body.style.height = "";
}

const isPathInclude = (e) => {
    const router = useRouter();
    const currentPath = router.pathname;
    return e.some(substring=>currentPath.includes(substring.toLowerCase()));
}

const emailToUsername = (e) => {
    return e.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
}

export {
    lockScroll,
    unlockScroll,
    isPathInclude,
    emailToUsername
};