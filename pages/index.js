import Head from 'next/head'
import { useState } from 'react';
import { useTheme } from 'next-themes'
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../components/Navbar';


export default function Home() {
  
  const [activeTab, setActiveTab] = useState(0);
  const [user, loading, error] = useAuthState(auth);

  const { theme, setTheme } = useTheme();
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>HiBee - Home</title>
      </Head>
      
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={user} theme={theme} setTheme={setTheme} />

      <main className="h-[200vh]">

      </main>
      
    </div>
  )
}
