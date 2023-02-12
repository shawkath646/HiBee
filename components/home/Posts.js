import { useState } from "react";
import Post from "./Post";
import LoadingAnimation from '../ui/LoadingAnimation';
import useWindowSize from "../../utilities/useWindowSize";

export default function Posts() {

    const [latestData, setLatestData] = useState([]);

    const windowSize = useWindowSize();

    return (
        <section className="col-span-9 lg:col-span-7 py-10 h-[815px]">
          <div className="text-center mb-10">
            <p className="text-4xl pb-1 border-b-2 border-gray-900 text-gray-900 dark:text-gray-200 dark:border-gray-200 inline-block px-5 font-light">Latest</p>
          </div>

          {latestData ? (
            <div className={`grid gap-4 ${(windowSize.width > 1700 && "grid-cols-4") || (windowSize.width > 1280 && windowSize.width <= 1700 && "grid-cols-3") || (windowSize.width > 768 && windowSize.width <= 1280 && "grid-cols-2") || (windowSize.width <= 768 && "grid-cols-1")} p-3`}>
              {latestData.map((data, key) => <Post key={key} data={data} userData={userData} />)}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <LoadingAnimation size="lg" />
            </div>
          )}
        </section>
    );
}