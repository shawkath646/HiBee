import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function NewPost({ isOpen, setIsOpen }) {
    return (
        <Transition
            as={Fragment}
            appear
            show={isOpen.state}
            
        >
            <Dialog
                as="div"
                onClose={() => setIsOpen({ ...isOpen, state: false })}
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
                    <div className="fixed inset-0 bg-black bg-opacity-75"></div>
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
                            <Dialog.Panel>
                                <Dialog.Title>Hi</Dialog.Title>
                                <Dialog.Description>{isOpen.type}</Dialog.Description>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}