import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState, Suspense } from 'react'
import { useSession } from 'next-auth/react';
import PostTemplate from '../components/ui/PostTemplate';
import useWindowSize from '../utilities/useWindowSize';
import LoadingAnimation from '../components/ui/LoadingAnimation';

export default  function Home() {


  const [newPostWindow, setNewPostWindow] = useState(false);
  const [latestData, setLatestData] = useState();

  const { data: session } = useSession();
  const windowSize = useWindowSize();

  const DynamicIntroductionComponent = dynamic(() => import('../components/home/IntroductionComponent'))
  const DynamicSidebar  = dynamic(() => import('../components/home/Sidebar'));
  const DynamicNewModal = dynamic(() => import('../components/modals/NewModal'));

  
  return (
    <>
      <Head>
        <title>HiBee - Home</title>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicNewModal isOpen={newPostWindow} setIsOpen={setNewPostWindow} />
      </Suspense>
      {!session && (
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicIntroductionComponent />
        </Suspense>
      )}
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
            <DynamicSidebar setNewPostWindow={setNewPostWindow} session={session} />
          </Suspense>
        </section>}
      </div>
      
    </>
  )
}


