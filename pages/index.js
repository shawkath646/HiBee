import Head from 'next/head'
import { useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import Navbar from '../components/Navbar'


export default function Home() {
  
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState();
  
  const navSearch = (value) => {
    console.log(value);
  }
  
  console.log(user);
  
  //onAuthStateChanged(auth, (user) => setUser(user));
  
  return (
    <div className="min-h-screen bg-blue-100">
      <Head>
        <title>HiBee - Home</title>
      </Head>
      
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} searchText={searchText} setSearchText={setSearchText} navSearch={navSearch} user={user} />
      
    </div>
  )
}
