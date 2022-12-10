import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import IntroductionComponent from '../components/IntroductionComponent';


export default function Home() {

  
  const [user, loading, error] = useAuthState(auth);

  const newUser = true;

  const DynamicSidebar = dynamic(() => import('../components/Sidebar'), {
    suspense: true,
  })
  
  return (
    <>
      <Head>
        <title>HiBee - Home</title>
      </Head>
      {newUser && <IntroductionComponent />}
      <div className="grid grid-cols-3 lg:gap-4 bg-white dark:bg-black max-w-[1800px] mx-auto mt-10">
        <section className="col-span-3 lg:col-span-2">
          HULA LULA
        </section>

        <section className="hidden lg:block lg:col-span-1">
        <Suspense fallback={`Loading...`}>
          <DynamicSidebar />
        </Suspense>
        </section>
        
      </div>
    </>
  )
}
