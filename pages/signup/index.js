import Head from 'next/head'
import { useState } from 'react'
import { useForm } from 'react-hook-form';


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  return (
    <div className="h-screen bg-blue-100">
      <Head>
        <title>Login / Create new account - HiBee</title>
      </Head>
      
      <main className="flex h-full items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className=" w-[450px] lg:w-[700px] p-3 bg-white rounded-lg shadow-xl space-y-10">
          <p className="text-4xl font-bold text-blue-700 text-center">HiBee<sub className="text-sm text-gray-700">AUTH</sub></p>
          <div className="space-y-4">
            <input type="email" placeholder="Email" {...register("Email", {required: true})} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-emerald-600 focus:outline-none invalid:border-red-600" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <input type={showPassword ? "text" : "password"} placeholder="Password" {...register("Password", {required: true})} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-emerald-600 focus:outline-none invalid:border-red-600" />
              <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" {...register("ConfirmPassword", {required: true})} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-emerald-600 focus:outline-none invalid:border-red-600" />
            </div>
            <div onClick={() => setShowPassword(!showPassword)} className="form-group form-check">
              <input
              type="checkbox"
              checked={showPassword}
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
              <label className="form-check-label inline-block text-gray-800"
              >Show Password</label>
            </div>
            <button type="submit" className="inline-block w-full py-2 bg-emerald-600 text-white font-medium leading-snug uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
            >Create new account</button>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">Or</p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}