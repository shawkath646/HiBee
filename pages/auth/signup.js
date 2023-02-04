import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { RadioGroup } from '@headlessui/react'
import { AiOutlineCheck } from 'react-icons/ai';
import ToggleButton from "../../components/ui/ToggleButton";
import CustomProviderButton from "../../components/signin/CustomProviderButton";
import useWindowSize from "../../utilities/useWindowSize";
import authImage from "../../public/assets/Mobilelogin.png";
import FormInput from "../../components/form/FormInput";
import CountryList from "../../components/form/CountryList";
import Checkbox from "../../components/form/Checkbox";
import { CgSpinner } from 'react-icons/cg';



export default function SignUp() {
    const { theme, setTheme } = useTheme();
    const windowSize = useWindowSize();

    const intialErrorState = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
        dateOfBrith: "",
        password: "",
        gender: "",
        backend: {}
    };

    var date = new Date();
    var formattedDate = date.toISOString().slice(0,10);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
        dateOfBrith: formattedDate,
        password: "",
        confirmPassword: "",
        gender: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(intialErrorState);


    const router = useRouter();

    const calculateAge = (dob) => {
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms);
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    
    const getAge = (dobString) => {
        var dobArray = dobString.split("-");
        var dob = new Date(dobArray[0], dobArray[1] - 1, dobArray[2]);
        return calculateAge(dob);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setData({ ...data, userName: data.email.replace(/@.*$/,"") });
        } catch (error) {
            console.log(error);
        };
        try {
            setErrorMessage(intialErrorState);
        } catch (error) {
            console.log(error);
        };
        if (!data.firstName) {
            setErrorMessage({ ...errorMessage, firstName: "Enter first name" });
            setLoading(false);
            return;
        } else if (!data.lastName) {
            setErrorMessage({ ...errorMessage, lastName: "Enter last name" });
            setLoading(false);
            return;
        } else if (!data.email) {
            setErrorMessage({ ...errorMessage, email: "Enter email" });
            setLoading(false);
            return;
        } else if (!data.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            setErrorMessage({ ...errorMessage, email: "Email is not valid" });
            setLoading(false);
            return;
        } else if (!data.password) {
            setErrorMessage({ ...errorMessage, password: "Enter password" });
            setLoading(false);
            return;
        } else if (!data.password.match(/[0-9]/) || !data.password.match(/[!@#\$%\^&\*]/)) {
            setErrorMessage({ ...errorMessage, password: "Password must include one number and special character" });
            setLoading(false);
            return;
        } else if (data.password !== data.confirmPassword) {
            setErrorMessage({ ...errorMessage, password: "Password doesn't match !" });
            setLoading(false);
            return;
        } else if (!data.phoneNumber) {
            setErrorMessage({ ...errorMessage, phoneNumber: "Enter phone number" });
            setLoading(false);
            return;
        } else if (getAge(data.dateOfBrith) < 12) {
            setErrorMessage({ ...errorMessage, dateOfBrith: "User must be at least 12 years old" });
            setLoading(false);
            return;
        } else if (!data.country) {
            setErrorMessage({ ...errorMessage, country: "Select country" });
            setLoading(false);
            return;
        } else if (!data.gender) {
            setErrorMessage({ ...errorMessage, gender: "Select gender" });
            setLoading(false);
            return;
        }
        
        await fetch("/api/auth/createAccountCre", {
            method: "POST",
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(async(msgData) => {
            setErrorMessage({ ...errorMessage, backend: msgData});
            if (!msgData.status) {
                setLoading(false);
                return;
            }
            const status = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: `/profile/${data.userName}`,
            }).catch(err => console.log(err));
            if (status.ok) router.push(status.url);
        });
        
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex justify-center items-center">
            <Head>
                <title>Create new account - HiBee</title>
            </Head>
            <div className="grid grid-cols-1 lg:grid-cols-3 rounded-sm max-w-8xl min-w-[450px] relative p-5 pt-14">
                <div className="absolute right-5 top-5">
                    <ToggleButton label="Dark theme" onChange={() => setTheme(theme === "dark" ? "light" : "dark")} checked={theme === "dark"} />
                </div>
                {windowSize.width >= 1080 && (
                    <div className="flex justify-center items-center">
                        <Image alt="SignUp vector Image" src={authImage.src} width="400" height="400" />
                    </div>
                )}
                <div className="w-full lg:w-[700px] mx-auto col-span-2">
                    <p className="text-6xl font-bold mb-7 text-center">H<span className="text-blue-500">i</span>Bee<small className="text-lg">auth</small></p>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="space-y-5">
                            <FormInput label="First Name" name="firstName" value={data.firstName} setValue={(e) => setData({...data, firstName: e})} errorText={errorMessage.firstName} />
                            <FormInput label="Last Name" name="lastName" value={data.lastName} setValue={(e) => setData({...data, lastName: e})} errorText={errorMessage.lastName} />
                            <FormInput label="Email" name="email" value={data.email} setValue={(e) => setData({...data, email: e})}  errorText={errorMessage.email} />
                            <FormInput label="Password" name="password" type={showPassword ? "text" : "password"} value={data.password} setValue={(e) => setData({...data, password: e})} errorText={errorMessage.password} />
                            <FormInput label="Confirm Password" name="confirmPassword" type={showPassword ? "text" : "password"} value={data.confirmPassword} setValue={(e) => setData({...data, confirmPassword: e})} />
                            <Checkbox onChange={() => setShowPassword(!showPassword)} label="Show password" checked={showPassword} />
                        </div>
                        <div className="space-y-5">
                            <FormInput label="Phone Number" name="phoneNumber" type="telephone" value={data.phoneNumber} setValue={(e) => setData({...data, phoneNumber: e})} errorText={errorMessage.phoneNumber} />
                            <FormInput label="Date of birth" type="date" value={data.dateOfBrith} setValue={(e) => setData({...data, dateOfBrith: e})} errorText={errorMessage.dateOfBrith} />
                            <CountryList
                              selected={data.country}
                              onSelect={(e) => setData({...data, country: e})} errorText={errorMessage.country}
                            />
                            <RadioGroup value={data.gender} onChange={(e) => setData({...data, gender: e})}>
                                <div  className="flex space-x-2 items-center">
                                    <RadioGroup.Label>Gender :</RadioGroup.Label>
                                    <RadioGroup.Option value="Male">
                                        {({ checked }) => (
                                        <button type="button" className={`flex space-x-1 items-center ${checked ? "text-blue-500" : ""}`}>
                                            {checked && <AiOutlineCheck className="h-4 w-4" />}
                                            <p>Male</p>
                                        </button>
                                        )}
                                    </RadioGroup.Option>
                                    <RadioGroup.Option value="Female">
                                        {({ checked }) => (
                                        <button type="button" className={`flex space-x-1 items-center ${checked ? "text-blue-500" : ""}`}>
                                            {checked && <AiOutlineCheck className="h-4 w-4" />}
                                            <p>Female</p>
                                        </button>
                                        )}
                                    </RadioGroup.Option>
                                </div>
                                <p className="text-sm text-red-500">{errorMessage.gender}</p>
                            </RadioGroup>
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                            <p className={`text-sm text-center mb-2 ${errorMessage.backend.status ? "text-green-500" : "text-red-500"}`}>{errorMessage.backend.message !== "" && errorMessage.backend.message}</p>
                            <button type="submit" disabled={loading} className="mx-auto rounded py-2 px-8 bg-blue-500 text-white transition-all font-medium hover:bg-blue-600 flex justify-center items-center">
                                {loading && <CgSpinner className="animate-spin h-5 w-5 mr-3"></CgSpinner>}
                                {loading ? "Creating..." : "Create new account"}
                            </button>
                        </div>
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
