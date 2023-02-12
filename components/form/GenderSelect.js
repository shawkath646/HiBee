import { Fragment } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { RiArrowDropDownLine} from 'react-icons/ri'


export default function GenderSelect({ value, onChange, errorText, className }) {

    const gendersList = ["Male", "Female", "Others"];

    return (
        <Listbox value={value} onChange={onChange}>
            <div className="relative cursor-pointer">
                <Listbox.Button className={`w-full rounded bg-transparent text-left outline-transparent sm:text-sm ${className}`}>
                    <span className="block truncate">{value ? value : "Select country"}</span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 text-black dark:text-gray-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {gendersList.map((e, k) =>
                        <Listbox.Option
                            key={k}
                            className={({ active }) => `relative select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-500 text-white dark:text-gray-200' : 'text-black dark:text-gray-200'}`}
                            value={e}
                            >
                            <span className="block truncate">{e}</span>
                            </Listbox.Option>
                    )}
                        </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
}