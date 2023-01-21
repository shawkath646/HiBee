export default function FormInput({ label, type="text", value, name, setValue }) {
    return (
        <div className="relative w-full">
            <input type={type}value={value} onChange={(e) => setValue(e.target.value)} className="outline-0 ring-0 border-[1.5px] rounded p-2 border-black dark:border-gray-200 w-full bg-transparent" name={name} />
            <label className="absolute -top-2 bg-white left-2 text-sm px-1 dark:bg-black">{label}</label>
        </div>
    );
}