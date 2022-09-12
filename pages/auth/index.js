import Head from 'next/head'
import { useForm } from 'react-hook-form';


export default function Auth() {
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
            <input type="email" placeholder="Email" {...register("Email", {required: true})} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
            <input type="password" placeholder="Password" {...register("Password", {required: true})} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
            <div class="flex justify-between items-center mb-6">
              <div class="form-group form-check">
                <input
                type="checkbox"
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                <label class="form-check-label inline-block text-gray-800" for="exampleCheck2"
                >Show Password</label>
              </div>
            </div>
            <button type="submit" className="inline-block w-full py-2 bg-blue-600 text-white font-medium leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >Login</button>
            <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p class="text-center font-semibold mx-4 mb-0">Or</p>
            </div>
          </div>
        </form>
        
 
      </main>
    </div>
  );
}