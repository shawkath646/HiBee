import { useEffect, useState } from "react";

export default function useWindowSize() {

    const [windowSize, setWindowSize] = useState({
        height: 0,
        width: 0
    });


    function handleResize() {

        setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
            handleResize();
            return(() => window.removeEventListener("resize", handleResize));
        }
    }, []);
    return windowSize;
}

