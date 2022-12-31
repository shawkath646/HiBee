import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useEffect, useState, Suspense } from 'react'
import PostTemplate from '../components/PostTemplate';
import useWindowSize from '../utilities/useWindowSize';
import { getSession } from 'next-auth/react';
import IntroductionComponent from '../components/IntroductionComponent';
import LoadingAnimation from '../components/LoadingAnimation';

export default function Home({session}) {

  const [newPostWindow, setNewPostWindow] = useState({
    state: false,
    type: "post",
  });
  const [latestData, setLatestData] = useState();

  const windowSize = useWindowSize();

  console.log(newPostWindow);

  const DynamicSidebar  = dynamic(() => import('../components/Sidebar'));
  const DynamicNewPost = dynamic(() => import('../components/NewPost'));

  
  return (
    <>
      <Head>
        <title>HiBee - Home</title>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicNewPost isOpen={newPostWindow} setIsOpen={setNewPostWindow} />
      </Suspense>
      {true && <IntroductionComponent />}
      <div className="grid grid-cols-9 lg:gap-2 pt-12">
        <section className="col-span-9 lg:col-span-7 py-10 bg-white dark:bg-gray-900 h-[815px]">
          <div className="text-center mb-10">
            <p className="text-4xl pb-1 border-b-2 border-gray-900 text-gray-900 dark:text-gray-200 dark:border-gray-200 inline-block px-5 font-light">Latest</p>
          </div>

          {latestData ? (
            <div className={`grid gap-4 ${(windowSize.width > 1700 && "grid-cols-4") || (windowSize.width > 1280 && windowSize.width <= 1700 && "grid-cols-3") || (windowSize.width > 768 && windowSize.width <= 1280 && "grid-cols-2") || (windowSize.width <= 768 && "grid-cols-1")} p-3`}>
              {latestData.map((data, key) => <PostTemplate key={key} data={data} userData={userData} />)}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <LoadingAnimation size="lg" />
            </div>
          )}

        </section>

        {windowSize.width >= 1024 && <section className="col-span-2 pr-3">
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicSidebar setNewPostWindow={setNewPostWindow} />
          </Suspense>
        </section>}
      </div>
      
    </>
  )
}

export async function getServerSideProps({req}) {
  const session = await getSession({req});

  return {
    props: {
      session
    },
  }
}
