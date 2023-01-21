import dynamic from 'next/dynamic'
import { Fragment, Suspense } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import LoadingAnimation from '../ui/LoadingAnimation';

export default function NewModal({ isOpen, setIsOpen }) {


    const DynamicNewPost = dynamic(() => import('./NewPost'));
    const DynamicNewStory = dynamic(() => import('./NewStory'));
    const DynamicNewClip = dynamic(() => import('./NewClip'));

    const filterClass = (...classes) => {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <Transition
            as={Fragment}
            appear
            show={isOpen}
        >
            <Dialog
                as="div"
                onClose={() => setIsOpen(false)}
                className="relative z-[9995]"
            >
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75" aria-hidden="true"></div>
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center">
                        <Transition.Child
                            enter="ease-out duration-300"
                            enterFrom="scale-95 opacity-0"
                            enterTo="scale-100 opacity-100"
                            leave="ease-out duration-200"
                            leaveFrom="scale-100 opacity-100"
                            leaveTo="scale-95 opacity-0"
                        >
                            <Dialog.Panel className="bg-white dark:bg-gray-900 rounded w-[450px] md:w-[500px] lg:w-[600px] h-[580px] p-5">
                                <Dialog.Title className="text-xl text-black dark:text-gray-200 text-center font-bold mb-5">Share what you want</Dialog.Title>
                                <Tab.Group>
                                    <Tab.List className="flex space-x-4 rounded-xl ring-2 ring-blue-700 p-1 mb-5">
                                        <Tab className={({ selected }) => filterClass('w-full rounded-lg py-2.5 font-bold leading-5 transition-all', selected ? 'bg-blue-700 hover:bg-blue-900 shadow text-white dark:text-gray-200' : 'hover:bg-blue-700/80 text-black dark:text-gray-200 hover:text-white dark:hover:text-gray-200')}>Post</Tab>
                                        <Tab className={({ selected }) => filterClass('w-full rounded-lg py-2.5 font-bold leading-5 transition-all', selected ? 'bg-blue-700 hover:bg-blue-900 shadow text-white dark:text-gray-200' : 'hover:bg-blue-700/80 text-black dark:text-gray-200 hover:text-white dark:hover:text-gray-200')}>Story</Tab>
                                        <Tab className={({ selected }) => filterClass('w-full rounded-lg py-2.5 font-bold leading-5 transition-all', selected ? 'bg-blue-700 hover:bg-blue-900 shadow text-white dark:text-gray-200' : 'hover:bg-blue-700/80 text-black dark:text-gray-200 hover:text-white dark:hover:text-gray-200')}>Clip</Tab>
                                    </Tab.List>
                                    <Tab.Panels>
                                        <Tab.Panel>
                                            <Suspense fallback={<LoadingAnimation size="md" />}>
                                                <DynamicNewPost />
                                            </Suspense>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <Suspense fallback={<LoadingAnimation size="md" />}>
                                                <DynamicNewStory />
                                            </Suspense>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <Suspense fallback={<LoadingAnimation size="md" />}>
                                                <DynamicNewClip />
                                            </Suspense>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div> 
                </div>
            </Dialog>
        </Transition>
    );
}