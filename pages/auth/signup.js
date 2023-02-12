import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { useForm } from 'react-hook-form';
import ToggleButton from "../../components/ui/ToggleButton";
import CustomProviderButton from "../../components/signin/CustomProviderButton";
import useWindowSize from "../../utilities/useWindowSize";
import authImage from "../../public/assets/Mobilelogin.png";
import CountryList from "../../components/form/CountryList";
import Checkbox from "../../components/form/Checkbox";
import { CgSpinner } from 'react-icons/cg';
import GenderSelect from "../../components/form/GenderSelect";



export default function SignUp() {
    const { theme, setTheme } = useTheme();
    const windowSize = useWindowSize();

    const intialErrorState = {
        country: "",
        dateOfBrith: "",
        password: "",
        gender: "",
        backend: {}
    };


    const { register, handleSubmit, formState: { errors } } = useForm();

    const [data, setData] = useState({
        country: "---Select---",
        gender: "---Select---",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(intialErrorState);


    const router = useRouter();
    
    const getAge = (e) => {
        var dob = new Date(e);  
        var month_diff = Date.now() - dob.getTime();  
        var age_dt = new Date(month_diff);   
        var year = age_dt.getUTCFullYear();  
        return Math.abs(year - 1970);  
    }

    const onSubmit = async(e) => {
        setLoading(true);
        console.log("e", e);
        console.log("data", data);
        console.log((e.dateOfBrith))
        if (e.password !== e.confirmPassword) {
            setErrorMessage({ ...errorMessage, password: "Password doesn't match !" });
            setLoading(false);
            return;
        } else if (getAge(e.dateOfBrith) < 12) {
            setErrorMessage({ ...errorMessage, dateOfBrith: "User must be at least 12 years old" });
            setLoading(false);
            return;
        } else if (data.country === "---Select---") {
            setErrorMessage({ ...errorMessage, country: "Select country" });
            setLoading(false);
            return;
        } else if (data.gender === "---Select---") {
            setErrorMessage({ ...errorMessage, gender: "Select gender" });
            setLoading(false);
            return;
        }
        setErrorMessage(intialErrorState);
        setLoading(false);
        return
        await fetch(`${process.env.BASE_URL}/api/auth/createAccount`, {
            method: "POST",
            body: JSON.stringify({

            }),
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
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="relative w-full">
                            <input type="text" {...register("firstName", {required: {value: true, message: "Enter first name"}, minLength: {value: 3, message: "Minimum 3 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}})} className={`outline-0 ring-0 border-[1.5px] rounded px-2 py-2.5  w-full bg-transparent ${errors.firstName ? "border-red-500" : "border-black dark:border-gray-200"}`} />
                            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-gray-900">First Name :</label>
                            <p className="text-sm text-red-500">{errors.firstName?.message}</p>
                        </div>
                        <div className="relative w-full">
                            <input type="text" {...register("lastName", {required: {value: true, message: "Enter last name"}, minLength: {value: 3, message: "Minimum 3 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}})} className={`outline-0 ring-0 border-[1.5px] rounded px-2 py-2.5  w-full bg-transparent ${errors.lastName ? "border-red-500" : "border-black dark:border-gray-200"}`} />
                            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-gray-900">Last Name :</label>
                            <p className="text-sm text-red-500">{errors.lastName?.message}</p>
                        </div>
                        <div className="relative w-full">
                            <input type="email" {...register("email", {required: {value: true, message: "Enter email"}})} className={`outline-0 ring-0 border-[1.5px] rounded px-2 py-2.5  w-full bg-transparent ${errors.email ? "border-red-500" : "border-black dark:border-gray-200"}`} />
                            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-gray-900">Email :</label>
                            <p className="text-sm text-red-500">{errors.email?.message}</p>
                        </div>
                        <div className="relative w-full">
                            <input type="date" {...register("dateOfBirth", {required: {value: true, message: "Enter date of birth"}})} className={`outline-0 ring-0 border-[1.5px] rounded px-2 py-2.5  w-full bg-transparent ${errors.dateOfBrith ? "border-red-500" : "border-black dark:border-gray-200"}`} />
                            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-gray-900">Date of Birth :</label>
                            <p className="text-sm text-red-500">{errors.dateOfBrith?.message || errorMessage.dateOfBrith}</p>
                        </div>
                        <div className="relative">
                            <CountryList
                                value={data.country}
                                onChange={(e) => setData({...data, country: e})} errorText={errorMessage.country}
                                className={`py-3 px-2 border-[1.5px] rounded ${errorMessage.country ? "border-red-500" : "border-black dark:border-gray-200"}`}
                            />
                            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-gray-900">Country</label>
                            <p className="text-sm text-red-500">{errorMessage.country}</p>
                        </div>
                        <div className="relative">
                            <GenderSelect
                                value={data.gender}
                                onChange={(e) => setData({...data, gender: e})} errorText={errorMessage.gender}
                                className={`py-3 px-2 border-[1.5px] rounded ${errorMessage.gender ? "border-red-500" : "border-black dark:border-gray-200"}`}
                            />
                            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-gray-900">Gender</label>
                            <p className="text-sm text-red-500">{errorMessage.gender}</p>
                        </div>
                        <div className="relative w-full">
                            <input type={showPassword ? "text" : "password"} {...register("password", {required: {value: true, message: "Enter password"}, minLength: {value: 8, message: "Minimum 8 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}})} className={`outline-0 ring-0 border-[1.5px] rounded px-2 py-2.5 w-full bg-transparent ${errors.password ? "border-red-500" : "border-black dark:border-gray-200"}`} />
                            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-gray-900">Password :</label>
                            <p className="text-sm text-red-500">{errors.password?.message || errorMessage.password}</p>
                        </div>
                        <div className="relative w-full">
                            <input type={showPassword ? "text" : "password"} {...register("confirmPassword", {required: {value: true, message: "Enter confirm password"}, minLength: {value: 8, message: "Minimum 8 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}})} className={`outline-0 ring-0 border-[1.5px] rounded px-2 py-2.5  w-full bg-transparent ${errors.confirmPassword ? "border-red-500" : "border-black dark:border-gray-200"}`} />
                            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-gray-900">Confirm Password :</label>
                            <p className="text-sm text-red-500">{errors.confirmPassword?.message}</p>
                        </div>
                        <Checkbox onChange={() => setShowPassword(!showPassword)} label="Show password" checked={showPassword} />
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
