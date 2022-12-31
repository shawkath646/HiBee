import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCsrfToken, useSession, signIn } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { AiOutlineGoogle } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import ToggleButton from '../../../components/toogleButton';




export default function SignIn({ csrfToken }) {

  const [showPassword, setShowPassword] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [isMounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  const { data: userData} = useSession();

  useEffect(() => {
    setMounted(true);
  }, [])
  
  const router = useRouter();
  const { callbackUrl } = router.query;

  

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="max-w-[1600px] mx-auto py-10 px-5 lg:px-2 relative">
        <Head>
          <title>Login / Create new account - HiBee</title>
        </Head>
        
        <div className="flex items-center justify-between">
          <p className="text-6xl font-bold"><span className=" text-emerald-500">Hi</span>Bee<small className="text-sm text-blue-600">auth</small></p>
          <ToggleButton label={"Dark Mode"} checked={isMounted && ( theme === "dark" )} onChange={() => setTheme((theme === "dark") ? "light" : "dark")} />
        </div>


        <div className="grid grid-cols-3 gap-10">
          <form method="post" action="/api/auth/callback/credentials" className="space-y-10 col-span-3 lg:col-span-1">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="space-y-4 max-w-xl mx-auto lg:mr-auto">
              <div className="space-y-2">
                <label className="block text-black dark:text-gray-200">Email :</label>
                <input type="email" name='email' className="bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-200 rounded p-2 w-full ring-0 outline-none invalid:border-red-500 transition-all ease-in-out focus:ring-violet-500" />
              </div>

              <div className="space-y-2">
                <label className="block text-black dark:text-gray-200">Password :</label>
                <input type={showPassword ? "text" : "password"} name='password' className="bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-200 rounded p-2 w-full ring-0 outline-none invalid:border-red-500 transition-all ease-in-out focus:ring-violet-500" />
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)} 
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                  <label className="form-check-label inline-block text-gray-800"
                  >Show Password</label>
                </div>
              </div>


              <button type="submit" className="inline-block w-full py-2 bg-blue-600 text-white font-medium leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:bg-gray-400"
              >Login</button>
            </div>
          </form>

          <div className="col-span-3 lg:col-span-2">
            <form className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-xl lg:max-w-2xl mx-auto lg:mr-0 lg:ml-auto">
              <div className="mb-3 space-y-3 lg:col-span-2 text-center">
                <p className="font-semibold text-3xl text-emerald-500">Register Now !</p>
                <p>Its easy and simple</p>
              </div>
              <div className="space-y-2">
                <label className="block text-black dark:text-gray-200">First Name :</label>
                <input type="text" name="firstName" className="bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-200 rounded p-2 w-full ring-0 outline-none invalid:border-red-500 transition-all ease-in-out focus:ring-violet-500 " />
              </div>
              <div className="space-y-2">
                <label className="block text-black dark:text-gray-200">Last Name :</label>
                <input type="text" name="lastName" className="bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-200 rounded p-2 w-full ring-0 outline-none invalid:border-red-500 transition-all ease-in-out focus:ring-violet-500" />
              </div>
              <div className="space-y-2">
                <label className="block text-black dark:text-gray-200">Email :</label>
                <input type="email" name="email" className="bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-200 rounded p-2 w-full ring-0 outline-none invalid:border-red-500 transition-all ease-in-out focus:ring-violet-500" />
              </div>
              <div className="space-y-2">
                <label className="block text-black dark:text-gray-200">Phone Number :</label>
                <input type="tel" name="phoneNumber" className="bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-200 rounded p-2 w-full ring-0 outline-none invalid:border-red-500 transition-all ease-in-out focus:ring-violet-500" />
              </div>
              <div className="space-y-2">
                <label className="block text-black dark:text-gray-200">Country :</label>
                <input type="text" name="country" className="bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-200 rounded p-2 w-full ring-0 outline-none invalid:border-red-500 transition-all ease-in-out focus:ring-violet-500" />
              </div>
              <button type="submit" className="lg:col-span-2 w-full lg:w-60 mx-auto  inline-block py-2 bg-pink-600 text-white font-medium leading-snug uppercase rounded shadow-md hover:bg-pink-700 hover:shadow-lg focus:bg-pink-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out disabled:bg-gray-400"
              >Login</button>
            </form>
          </div>

          <div className="col-span-3 mx-auto space-y-2">
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0 text-gray-600">Or</p>
            </div>
            <button type="button" onClick={() => signIn("google", {callbackUrl: callbackUrl})} className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 disabled:bg-gray-400 space-x-2">
              <AiOutlineGoogle size="lg" className="w-5 h-5" />
              <p>Sign in with Google</p>
            </button>


            <button type="button" onClick={() => signIn("facebook", {callbackUrl: callbackUrl})} className="w-full text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded text-sm px-5 py-2.5 inline-flex items-center justify-center dark:focus:ring-[#3b5998]/55 disabled:bg-gray-400 space-x-2">
              <FaFacebook size="lg" className="w-5 h-5" />
              <p>Sign in with Facebook</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}


export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context) || null,
    },
  }
}