import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { signInWithPopup } from "firebase/auth";
import { auth, providerGoogle } from '../../firebase';
import { useForm } from 'react-hook-form';


export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  const router = useRouter();
  

  const loginGoogle = () => {
    signInWithPopup(auth, providerGoogle)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      router.back();
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  return (
    <div className="h-screen bg-blue-100">
      <Head>
        <title>Login / Create new account - HiBee</title>
      </Head>
      
      <main className="flex h-full items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className=" w-[450px] lg:w-[700px] p-3 bg-white rounded-lg shadow-xl space-y-10">
          <p className="text-4xl font-bold text-blue-700 text-center">HiBee<sub className="text-sm text-gray-700">AUTH</sub></p>
          <div className="space-y-4">
            <input type="email" placeholder="Email" {...register("Email", {required: true})} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none invalid:border-red-600" />
            <input type={showPassword ? "text" : "password"} placeholder="Password" {...register("Password", {required: true})} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
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
              <Link href="/signup">
                <p className="text-blue-700 font-semibold">Create new account</p>
              </Link>
            </div>
            <button type="submit" className="inline-block w-full py-2 bg-blue-600 text-white font-medium leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >Login</button>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">Or</p>
            </div>
            <button type="button" onClick={() => loginGoogle()} className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
              <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                 Sign in with Google
            </button>
            <button type="button" className="w-full text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
               <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
                  Sign in with Facebook
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}