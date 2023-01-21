export default function Checkbox({ label, onChange, checked }) {
    return (
        <div onClick={onChange} className="flex items-center space-x-2">
            <input type="checkbox" readOnly checked={checked} className="w-4 h-4" />
            <label>{label}</label>
        </div>
    );
}