import Image from "next/image";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { useState, Fragment, useEffect } from "react";
import { useForm } from 'react-hook-form';
import FormInput from "../components/form/FormInput";
import { Transition, Dialog, Listbox } from "@headlessui/react";
import profilePicGenerator from "../utilities/profilePicGenerator"
import { AiOutlineCamera, AiOutlineCheck } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import { RiArrowDropDownLine} from 'react-icons/ri'


export default function Profile({ stringySession }) {
    const session = JSON.parse(stringySession);

    var date = new Date();
    var formattedDate = date.toISOString().slice(0,10);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: session.user.userInfo?.firstName,
            lastName: session.user.userInfo?.lastName,
            email: session.user.email,
            phoneNumber: session.user.userInfo?.phoneNumber,
            dateOfBirth: session.user.userInfo?.dateOfBirth || formattedDate,
        }
    });
    const onSubmit = async(data) => {
        
        console.log(data)
    };

    const [data, setData] = useState({
        country: session.user.userInfo?.country,
        profilePic: session.user.image,
        coverPhoto: session.user.userInfo?.coverPhoto,
        skills: session.user.userInfo?.skills,
        gender: session.user.userInfo?.gender,
    });

    const [ dialog, setDialog ] = useState(0);

    useEffect(() => {
        if (!session.user.metaInfo?.wizardComplete) setDialog(1);
    }, [])

    const genders = [
        { name: 'Male' },
        { name: 'Female' },
        { name: 'Others' },
    ]

    return (
        <div className="min-h-screen max-w-7xl mx-auto pt-[50px] lg:pt-[10px]">
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
                        <Image src={session.user.image || profilePicGenerator(session.user.userInfo?.gender)} aly="" fill />
                    </div>
                    <button className="absolute right-2 bottom-2 bg-gray-200/75 dark:bg-black/50 dark:hover:bg-black/75 rounded-full hover:bg-gray-300/75 transition-all">
                        <AiOutlineCamera className="h-10 w-10 p-1" />
                    </button>
                    <p className="text-xl text-gray-800 text-center dark:text-gray-400">@{session.user.name}</p>
                </div>
            </div>
            <div>
                <p className="text-xl text-black dark:text-gray-200 text-center font-semibold">Edit profile</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 lg:p-0 mt-10">
                <section className="space-y-5 max-w-md">
                    <div className="space-y-1">
                        <label className="text-black dark:text-gray-200">First Name :</label>
                        <input type="text" {...register("firstName", {required: {value: true, message: "Enter first name"}, minLength: {value: 3, message: "Minimum 3 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}})} className={`bg-transparent pb-2 border-b outline-0 w-full text-gray-600 dark:text-gray-200 ${errors.firstName ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all`} />
                        <p className="text-sm text-red-500">{errors.firstName?.message}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-black dark:text-gray-200">Last Name :</label>
                        <input type="text" {...register("lastName", {required: {value: true, message: "Enter last name"}, minLength: {value: 3, message: "Minimum 3 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}})} className={`bg-transparent pb-2 border-b outline-0 w-full text-gray-600 dark:text-gray-200 ${errors.lastName ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                        <p className="text-sm text-red-500">{errors.lastName?.message}</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-black dark:text-gray-200">Date of Birth :</label>
                        <input type="date" {...register("dateOfBirth", {required: true})} className={`bg-transparent pb-2 border-b outline-0 w-full text-gray-600 dark:text-gray-200 ${errors.lastName ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                        <p className="text-sm text-red-500">{errors.dateOfBirth?.message}</p>
                    </div>
                    
                </section>
                <section className="space-y-5 max-w-md">
                    <div className="space-y-1">
                        <label className="text-black dark:text-gray-200">Email :</label>
                        <input type="text" {...register("email", {required: {value: true, message: "Enter email"}, pattern: { value: /^\S+@\S+$/i, message: "Invalid email format"}})} className={`bg-transparent pb-2 border-b outline-0 w-full text-gray-600 dark:text-gray-200 ${errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} readOnly />
                        <p className="text-sm text-red-500">{errors.email?.message}</p>
                        <p className="text-sm text-blue-500">* Email can't be change</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-black dark:text-gray-200">Phone Number :</label>
                        <input type="tel" {...register("phoneNumber", {required: true, max: 0, min: 3, maxLength: 12})} className={`bg-transparent pb-2 border-b outline-0 w-full text-gray-600 dark:text-gray-200 ${errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                        <p className="text-sm text-red-500">{errors.phoneNumber?.message}</p>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-black dark:text-gray-200 text-base">Select Gender :</label>
                        <Listbox value={data.gender} onChange={e => setData({...data, gender: e.name})}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-pointer text-black dark:text-gray-200 py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                                    <span className="block truncate">{data.gender}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <RiArrowDropDownLine className="h-7 w-7 text-gray-400" aria-hidden="true" />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 text-black dark:text-gray-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {genders.map((e, k) => (
                                        <Listbox.Option
                                            key={k}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-blue-500/30 text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-gray-200'
                                                }`
                                            }
                                            value={e}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                        selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                    >
                                                        {e.name}
                                                    </span>
                                                    {selected && (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                            <AiOutlineCheck className="h-5 w-5" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                </section>
                <div className="col-span-1 lg:col-span-2 mt-8">
                    <button type="submit" className="mx-auto shadow-lg rounded py-1 px-8 bg-blue-500 text-white transition-all font-medium hover:bg-blue-600 flex justify-center items-center">Update</button>
                </div>
            </form>
            <form className="max-w-md mt-14 p-2 lg:p-0">
                <p className="font-semibold text-xl text--black mb-5">Change Password</p>
                <div className="space-y-1">
                    <label className="text-black dark:text-gray-200">Old Password</label>
                    <input type="password" {...register("oldPassword", {minLength: {value: 8, message: "Minimum 8 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}, pattern: {value: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", message: "Password must contain 1 capital word"}})} className={`bg-transparent pb-2 border-b outline-0 w-full text-gray-600 dark:text-gray-200 ${errors.oldPassword ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                    <p className="text-sm text-red-500">{errors.oldPassword?.message}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-black dark:text-gray-200">New Password</label>
                    <input type="password" {...register("newPassword", {minLength: {value: 8, message: "Minimum 8 character required"}, maxLength: { value: 32, message: "Maximum 32 character allowed"}, pattern: {value: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", message: "Password must contain 1 capital word"}})} className={`bg-transparent pb-2 border-b outline-0 w-full text-gray-600 dark:text-gray-200 ${errors.newPassword ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                    <p className="text-sm text-red-500">{errors.newPassword?.message}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-black dark:text-gray-200">Confirm New Password</label>
                    <input type="password" {...register("confirmNewPassword", {min: 7, maxLength: 32, pattern: {value: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", message: "Password must contain 1 capital word"}})} className={`bg-transparent pb-2 border-b outline-0 w-full text-gray-600 dark:text-gray-200 ${errors.confirmNewPassword ? "border-red-500" : "border-gray-200 dark:border-gray-800 focus:border-green-500"} transition-all autofill:bg-transparent`} />
                    <p className="text-sm text-red-500">{errors.confirmNewPassword?.message}</p>
                </div>
            </form>
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