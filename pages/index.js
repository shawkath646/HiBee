import Head from 'next/head'
import { useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../components/Navbar';


export default function Home() {
  
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [user, loading, error] = useAuthState(auth);
  
  const navSearch = (value) => {
    console.log(value);
  }
  
  console.log(user);
  
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>HiBee - Home</title>
      </Head>
      
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} searchText={searchText} setSearchText={setSearchText} navSearch={navSearch} user={user} />
      
    </div>
  )
}
