const lockScroll = () => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
}

const unlockScroll = () => {
    document.body.style.overflow = "";
    document.body.style.height = "";
}

export {
    lockScroll,
    unlockScroll
};