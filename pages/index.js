import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState, Suspense } from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import Posts from '../components/home/Posts';
import IntroductionComponent from '../components/home/IntroductionComponent';
import useWindowSize from '../utilities/useWindowSize';


export default function Home({ stringySession }) {

  const [newPostWindow, setNewPostWindow] = useState(false);

  const session = JSON.parse(stringySession);
  const windowSize = useWindowSize();

  console.log(session);

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
      {!session && <IntroductionComponent />}
      <div className="grid grid-cols-9 bg-white dark:bg-gray-900">
        <Posts />

        {windowSize.width >= 1024 && <section className="col-span-2 pr-3">
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicSidebar setNewPostWindow={setNewPostWindow} session={session} />
          </Suspense>
        </section>}
      </div>
    </>
  )
}


export async function getServerSideProps(context) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session && !session.user.metaInfo?.wizardComplete) {
    return {
      redirect: {
        destination: "/profile/",
        permanent: false,
      }
    }
  }
  return {
    props: {
      stringySession: JSON.stringify(session),
    }
  }
}

