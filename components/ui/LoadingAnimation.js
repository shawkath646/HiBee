export default function LoadingAnimation({ size }) {

    var _a, _b;

    if (size === "sm") {
        _a = 4, _b = 25;
    } else if (size === "md") {
        _a = 5, _b = 30;
    } else if (size === "lg") {
        _a = 7, _b = 40;
    } else if (size === "xl") {
        _a = 8, _b = 50;
    } else {
        throw new Error("Invalid animation size");
    }

    return (
        <div className="flex space-x-2">
            <div className={`rounded-full bg-pink-500 h-${_a} w-${_a} ani`}></div>
            <div className={`rounded-full bg-emerald-500 h-${_a} w-${_a} ani`}></div>
            <div className={`rounded-full bg-yellow-500 h-${_a} w-${_a} ani`}></div>
            <div className={`rounded-full bg-blue-500 h-${_a} w-${_a} ani`}></div>
            <style jsx>{`
                .ani {
                    animation: 2s ab ease infinite;
                }
                .ani:nth-child(2) {
                    animation-delay: 0.25s;
                }
                .ani:nth-child(3) {
                    animation-delay: 0.5s;
                }
                .ani:nth-child(4) {
                    animation-delay: 0.75s;
                }
                

                @keyframes ab {
                    0% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(${_b}px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }
            `}</style>
        </div>
    );
}