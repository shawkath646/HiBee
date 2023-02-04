export default function FormInput({ label, type="text", value, name, setValue, required, errorText="", readOnly }) {
    return (
        <div className="relative w-full">
            <input type={type}value={value} onChange={(e) => setValue(e.target.value)} className={`outline-0 ring-0 border-[1.5px] rounded px-2 py-2.5  w-full bg-transparent ${errorText === "" ? "border-black dark:border-gray-200" : "border-red-500"}`} name={name} required={required} readOnly={readOnly} />
            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-black">{label}</label>
            <p className="text-sm text-red-500">{errorText}</p>
        </div>
    );
}