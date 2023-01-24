import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import countries from '../../server-config/countries';


export default function CountryList({ selected, onSelect }) {

  return (
      <Listbox value={selected} onChange={onSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded bg-transparent border border-[1.5px] py-2.5 px-2 text-left focus:outline-none sm:text-sm">
            <span className="block truncate">{selected === "" ? "Select country" : selected}</span>
            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-black">Country</label>
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
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 text-black dark:text-gray-200 ${
                      active ? 'bg-blue-500' : ''
                    }`
                  }
                  value={country}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {country}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
  )
}
