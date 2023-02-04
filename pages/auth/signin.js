import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, getCsrfToken } from 'next-auth/react';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { useTheme } from 'next-themes';
import ToggleButton from '../../components/ui/ToggleButton';
import FormInput from '../../components/form/FormInput';
import Checkbox from '../../components/form/Checkbox';
import CustomProviderButton from '../../components/signin/CustomProviderButton';
import useWindowSize from '../../utilities/useWindowSize';
import { CgSpinner } from 'react-icons/cg';
import authImage from '../../public/assets/20944201.png';


export default function SignIn({ csrfToken }) {

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const { theme, setTheme } = useTheme();
  const windowSize = useWindowSize();

  const router = useRouter();


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const status = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/"
    });
    if (status.ok) router.push(status.url)
    else setLoading(false);
  }
  

  return (
    <div className="bg-white dark:bg-gray-800 flex items-center justify-center min-h-screen">
      <Head>
        <title>Login - HiBee</title>
      </Head>

      <div className="max-w-5xl min-w-[450px] grid gap-10 grid-cols-1 lg:grid-cols-2 p-8 rounded-sm relative pt-14">
          <div className="absolute right-5 top-5">
            <ToggleButton label="Dark theme" onChange={() => setTheme(theme === "dark" ? "light" : "dark")} checked={theme === "dark"} />
          </div>
          {windowSize.width >= 1080 && <Image alt="SignIn vector Image" src={authImage.src} width="400" height="400" />}
        <div className="w-full lg:w-80 mx-auto">
          <p className="text-6xl font-bold mb-7 text-center">H<span className="text-blue-500">i</span>Bee<small className="text-lg">auth</small></p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} className="space-y-5" />
            <FormInput label="Email" type="email" name="email" value={data.email} setValue={(e) => setData({ ...data, email: e})} required />
            <FormInput label="Password" type={showPassword ? "text" : "password"} name="password" value={data.password} setValue={(e) => setData({ ...data, password: e})} required />
            <div className="flex items-center justify-between">
              <Checkbox onChange={() => setShowPassword(!showPassword)} label="Show password" checked={showPassword} />
              <Link href="/auth/signup" className="text-blue-500 transition-all hover:text-blue-700">Create an account</Link>
            </div>
            <button type="submit" disabled={loading} className="w-full border-none hover:bg-blue-700 py-1.5 text-sm rounded text-white border transition-all bg-blue-500 flex items-center justify-center">
              {loading && <CgSpinner className="animate-spin h-5 w-5 mr-3"></CgSpinner>}
              {loading ? "Processing..." : "LOGIN"}
            </button>
          </form>
          <CustomProviderButton />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    }
  };
}
