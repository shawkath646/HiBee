import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import countries from '../../server-config/countries';


export default function CountryList({ value, onChange, errorText, className }) {

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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black z-50 ring-opacity-5 focus:outline-none sm:text-sm">
              {Object.values(countries).sort().map((country, countryId) => (
                <Listbox.Option
                  key={countryId}
                  className={({ active }) => `relative select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-500 text-white dark:text-gray-200' : 'text-black dark:text-gray-200'}`}
                  value={country}
                >
                  <span className="block truncate">{country}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
  )
}
