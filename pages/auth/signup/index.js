import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { useTheme } from "next-themes";
import ToggleButton from "../../../components/ui/ToggleButton";
import CustomProviderButton from "../../../components/signin/CustomProviderButton";
import useWindowSize from "../../../utilities/useWindowSize";
import authImage from "../../../public/assets/Mobilelogin.png";
import FormInput from "../../../components/form/FormInput";
import Checkbox from "../../../components/form/Checkbox";


export default function SignUp() {


    const { theme, setTheme } = useTheme();

    const windowSize = useWindowSize();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: null,
        dateOfBrith: null,
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex justify-center items-center">
            <Head>
                <title>Create new account - HiBee</title>
            </Head>
            <div className="grid grid-cols-1 lg:grid-cols-3 bg-white dark:bg-black rounded-sm max-w-8xl min-w-[450px] relative p-5 pt-14 shadow-xl">
                <div className="absolute right-5 top-5">
                    <ToggleButton label="Dark theme" onChange={() => setTheme(theme === "dark" ? "light" : "dark")} checked={theme === "dark"} />
                </div>
                {windowSize.width >= 1080 && <Image alt="SignUp vector Image" src={authImage.src} width="400" height="400" />}
                <div className="w-full lg:w-[700px] mx-auto col-span-2">
                    <p className="text-6xl font-bold mb-7 text-center">H<span className="text-blue-500">i</span>Bee<small className="text-lg">auth</small></p>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="space-y-5">
                            <FormInput label="First Name" name="firstName" value={data.firstName} setValue={(e) => setData({...data, firstName: e})} />
                            <FormInput label="Last Name" name="lastName" value={data.lastName} setValue={(e) => setData({...data, lastName: e})} />
                            <FormInput label="Email" name="email" type="email" value={data.email} setValue={(e) => setData({...data, email: e})} />
                            <FormInput label="Password" name="password" type={showPassword ? "text" : "password"} value={data.password} setValue={(e) => setData({...data, password: e})} />
                            <FormInput label="Confirm Password" name="confirmPassword" type={showPassword ? "text" : "password"} value={data.confirmPassword} setValue={(e) => setData({...data, confirmPassword: e})} />
                            <Checkbox onChange={() => setShowPassword(!showPassword)} label="Show password" checked={showPassword} />
                        </div>
                        <div className="space-y-5">
                            <FormInput label="First Name" name="firstName" value={data.firstName} setValue={(e) => setData({...data, firstName: e})} />
                            <FormInput label="Last Name" name="lastName" value={data.lastName} setValue={(e) => setData({...data, lastName: e})} />
                            <FormInput label="Email" name="email" type="email" value={data.email} setValue={(e) => setData({...data, email: e})} />
                        </div>
                        <button type="submit">Create account</button>
                    </form>
                    <CustomProviderButton />
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
  
    if (session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    }
  
    return {
      props: {}
    };
  }
