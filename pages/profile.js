import Image from "next/image";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { useState, Fragment, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { Transition, Dialog } from "@headlessui/react";
import profilePicGenerator from "../utilities/profilePicGenerator"
import { AiOutlineCamera } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import { CgSpinner } from "react-icons/cg";
import GenderSelect from "../components/form/GenderSelect";
import CountryList from "../components/form/CountryList";
import { emailToUsername } from "../utilities/tools";


export default function Profile({ stringySession }) {
    const session = JSON.parse(stringySession);

    const [dialog, setDialog] = useState(0);
    const [loading, setLoading] = useState(0);
    const [statusMsg, setStatusMsg] = useState({
        1: {
            status: 200,
            message: ""
        },
        2: {
            status: 200,
            message: ""
        },
        3: {
            status: 200,
            message: ""
        },
    })

    var date = new Date();
    var formattedDate = date.toISOString().slice(0,10);

    const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 } } = useForm({
        defaultValues: {
            firstName: session.user.userInfo?.firstName,
            lastName: session.user.userInfo?.lastName,
            email: session.user.email,
            phoneNumber: session.user.userInfo?.phoneNumber,
            dateOfBirth: session.user.userInfo?.dateOfBirth || formattedDate,
        }
    });
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm({
        defaultValues: {
            
        }
    });

    const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 } } = useForm();

    const [data, setData] = useState({
        country: session.user.userInfo?.country || "",
        profilePic: session.user.image,
        coverPhoto: session.user.userInfo?.coverPhoto,
        skills: session.user.userInfo?.skills || [],
        gender: session.user.userInfo?.gender || "--- Select ---",
    });

    const validatePhoneNumber = (value) => {
        let error;
        if (!value) {
          error = 'Phone number is required';
        } else if (!/^\d{11}$/.test(value)) {
          error = 'Invalid phone number, must be 10 digits';
        }
        return error || true;
    };

    const onSubmit1 = async(formData) => {
        setLoading(1);
        try {
            await fetch("/api/profile/edit", {
                method: "POST",
                body: JSON.stringify({
                    name: emailToUsername(formData.email),
                    email: formData.email,
                    userInfo: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        dateOfBirth: formData.dateOfBirth,
                        phoneNumber: formData.phoneNumber,
                        country: data.country,
                        gender: data.gender,
                    },
                }),
            })
            .then(res => res.json())
            .then(e => {
                setStatusMsg({...statusMsg, 1: { status: e.statusCode, message: e.message }});
            });
        } catch (error) {
            console.log(error);
        }
        setLoading(0)
    };
    const onSubmit2 = async(data) => {
        setLoading(2);
        console.log(data)
    };
    const onSubmit3 = async(data) => {
        setLoading(3);
        console.log(data)
    };

    useEffect(() => {
        if (!session.user.metaInfo?.wizardComplete) setDialog(1);
    }, []);


    return (
        <div className="min-h-screen max-w-7xl mx-auto pt-[50px] xl:pt-[10px] px-3 xl:px-0">
            <div className="relative mb-10">
                <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 relative">
                    {session.user.userInfo?.coverPhoto && <Image src={session.user.userInfo?.coverPhoto} alt="" fill />}
                    <button type="button" className="rounded-lg bg-white dark:bg-gray-800 text-black dark:text-gray-200 flex items-center py-1 px-2 text-sm font-semibold space-x-2 absolute right-2 bottom-2 transition-all hover:bg-gray-300 dark:hover:bg-gray-900">
                        <BsFillPencilFill className="h-4 w-4" />
                        <p>Change background picture</p>
                    </button>
                </div>
                <div className="absolute left-4 lg:left-10 -bottom-20">
                    <div className="border-4 border-blue-500 relative bg-white dark:bg-gray-900 rounded-full h-44 w-44 overflow-hidden">
                        <Image src={session.user.image || profilePicGenerator(session.user.userInfo?.gender)} alt="" fill />
                    </div>
                    <button className="absolute right-2 bottom-2 bg-gray-200/75 dark:bg-black/50 dark:hover:bg-black/75 rounded-full hover:bg-gray-300/75 transition-all">
                        <AiOutlineCamera className="h-10 w-10 p-1" />
                    </button>
                    <p className="text-xl text-gray-800 text-center dark:text-gray-400">@{session.user.name}</p>
                </div>
            </div>
            <p className="mt-28 lg:mt-0 text-2xl lg:text-3xl text-black dark:text-gray-200 text-center font-medium">Personal information</p>
            <form onSubmit={handleSubmit1(onSubmit1)} className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-2 lg:p-0 mt-10 mx-auto">
                <div className="space-y-1">
                    <label className="text-black dark:text-gray-200 font-medium">First Name :</label>
                    <input type="text" {...register1("firstName", {required: {value: true, message: "Enter first name"}, minLength: {value: 3, message: "Minimum 3 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}})} className={`bg-transparent pb-2 border-b outline-0 w-full md:w-96 block text-gray-600 dark:text-gray-200 ${errors1.firstName ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all`} />
                    <p className="text-sm text-red-500">{errors1.firstName?.message}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-black dark:text-gray-200 font-medium">Last Name :</label>
                    <input type="text" {...register1("lastName", {required: {value: true, message: "Enter last name"}, minLength: {value: 3, message: "Minimum 3 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}})} className={`bg-transparent pb-2 border-b outline-0 w-full md:w-96 block text-gray-600  dark:text-gray-200 ${errors1.lastName ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                    <p className="text-sm text-red-500">{errors1.lastName?.message}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-black dark:text-gray-200 font-medium">Email :</label>
                    <input type="text" {...register1("email", {required: {value: true, message: "Enter email"}, pattern: { value: /^\S+@\S+$/i, message: "Invalid email format"}})} className={`bg-transparent pb-2 border-b outline-0 w-full md:w-96 block text-gray-600  dark:text-gray-200 ${errors1.email ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} readOnly />
                    <p className="text-sm text-red-500">{errors1.email?.message}</p>
                    <p className="text-sm text-blue-500">* Email can&apos;t be change</p>
                </div>
                <div className="space-y-1">
                    <label className="text-black dark:text-gray-200 font-medium">Phone Number :</label>
                    <input type="tel" {...register1("phoneNumber", { validate: validatePhoneNumber } )} className={`bg-transparent pb-2 border-b outline-0 w-full md:w-96 block text-gray-600  dark:text-gray-200 ${errors1.phoneNumber ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                    <p className="text-sm text-red-500">{errors1.phoneNumber?.message}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-black dark:text-gray-200 font-medium">Date of Birth :</label>
                    <input type="date" {...register1("dateOfBirth", {required: true})} className={`bg-transparent pb-2 border-b outline-0 w-full md:w-96 block text-gray-600  dark:text-gray-200 ${errors1.lastName ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                    <p className="text-sm text-red-500">{errors1.dateOfBirth?.message}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-black dark:text-gray-200 font-medium">Country :</label>
                    <CountryList value={data.country} onChange={e => setData({ ...data, country: e })} className="pb-2 border-b outline-0 w-96 text-gray-600 dark:text-gray-200" />
                    <p className="text-sm text-red-500">{errors1.dateOfBirth?.message}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-black dark:text-gray-200 font-medium">Select Gender :</label>
                    <GenderSelect value={data.gender} onChange={e => setData({ ...data, gender: e })} className="pb-2 border-b outline-0 w-96 text-gray-600 dark:text-gray-200" />
                    <p className="text-sm text-red-500">{errors1.dateOfBirth?.message}</p>
                </div>
                <div className="col-span-1 lg:col-span-2 mt-8">
                    <p className={`text-sm mb-2 text-center ${statusMsg[1].status > 400 ? "text-red-500" : "text-green-500"}`}>{statusMsg[1].message}</p>
                    <button type="submit" disabled={loading} className="mx-auto rounded py-1 px-8 bg-blue-500/25 text-blue-700 transition-all font-medium hover:bg-blue-500/60 disabled:bg-blue-500/10 dark:text-gray-200 flex justify-center items-center">
                        {loading == 1 && <CgSpinner className="animate-spin h-5 w-5 mr-3" />}
                        <p>{loading == 1 ? "Updating..." : "Update personal info"}</p>
                    </button>
                </div>
            </form>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <form onSubmit={onSubmit2}>
                    <div className="col-span-1 lg:col-span-2 mt-8">
                        <button type="submit" disabled={loading} className="mx-auto rounded py-1 px-8 bg-blue-500/25 text-blue-700 transition-all font-medium hover:bg-blue-500/60 disabled:bg-blue-500/10 dark:text-gray-200 flex justify-center items-center">
                            {loading == 2 && <CgSpinner className="animate-spin h-5 w-5 mr-3" />}
                            <p>{loading == 2 ? "Updating..." : "Update additional info"}</p>
                        </button>
                    </div>
                </form>
                <form onSubmit={handleSubmit3(onSubmit3)} className="max-w-md mt-14 p-2 lg:p-0">
                    <p className="text-xl lg:text-2xl text-black dark:text-gray-200 mb-5">Change Password</p>
                    <div className="space-y-1">
                        <label className="text-black dark:text-gray-200 font-medium">Old Password</label>
                        <input type="password" {...register3("oldPassword", {minLength: {value: 8, message: "Minimum 8 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}, pattern: {value: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", message: "Password must contain 1 capital word"}})} className={`bg-transparent pb-2 border-b outline-0 w-full md:w-96 block text-gray-600  dark:text-gray-200 ${errors3.oldPassword ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                        <p className="text-sm text-red-500">{errors3.oldPassword?.message}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-black dark:text-gray-200 font-medium">New Password</label>
                        <input type="password" {...register3("newPassword", {minLength: {value: 8, message: "Minimum 8 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}, pattern: {value: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", message: "Password must contain 1 capital word"}})} className={`bg-transparent pb-2 border-b outline-0 w-full md:w-96 block text-gray-600  dark:text-gray-200 ${errors3.newPassword ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                        <p className="text-sm text-red-500">{errors3.newPassword?.message}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-black dark:text-gray-200 font-medium">Confirm New Password</label>
                        <input type="password" {...register3("confirmNewPassword", {minLength: {value: 7, message: "Minimum 8 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}, pattern: {value: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", message: "Password must contain 1 capital word"}})} className={`bg-transparent pb-2 border-b outline-0 w-full md:w-96 block text-gray-600  dark:text-gray-200 ${errors3.confirmNewPassword ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                        <p className="text-sm text-red-500">{errors3.confirmNewPassword?.message}</p>
                    </div>
                    <div className="col-span-1 lg:col-span-2 mt-8">
                        <button type="submit" disabled={loading} className="mx-auto rounded py-1 px-8 bg-blue-500/25 text-blue-700 transition-all font-medium hover:bg-blue-500/60 disabled:bg-blue-500/10 dark:text-gray-200 flex justify-center items-center">
                            {loading == 3 && <CgSpinner className="animate-spin h-5 w-5 mr-3" />}
                            <p>{loading == 3 ? "Updating..." : "Update password"}</p>
                        </button>
                    </div>
                </form>
            </div>
            <Transition show={dialog == 1} as={Fragment}>
                <Dialog as="div" onClose={() => {}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed z-[9998] inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed z-[9999] inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-black dark:bg-gray-800 dark:text-gray-200 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-xl font-medium leading-8 text-center">
                                        Complete profile with required information before using HiBee
                                    </Dialog.Title>
                                    <button type="button" onClick={() => setDialog(0)} className="border-none outline-0 mt-8 w-full bg-blue-500 text-white text-sm transition-all hover:bg-blue-700 dark:text-gray-200 py-1 rounded">Close</button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin"
            }
        }
    }
    return {
      props: {
        stringySession: JSON.stringify(session),
      }
    }
}