import className from "classnames";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
function Input({
    label,
    type,
    placeholder,
    value,
    icon,
    onChange,
    ...rest
}) {

    const [showPassword, setShowPassword] = useState(false);
    const classes = className(
        "flex flex-col w-full ",
        rest.className
    )
    const required = rest.required ? <sup className="top-[-2px] font-extrabold text-red-500 text-lg">*</sup> : null;
    return (
        <div className={classes}>
            {label && <label className="text-gray-800 text-md">{label} {required}</label>}
            <div className="flex flex-row border border-gray-300 rounded py-2 px-2 justify-center items-center">
                {icon && <div className="mr-2">{icon}</div>}


                <input
                    className="w-full bg-transparent outline-none flex justify-center items-center"
                    type={type === "password" ? showPassword ? "text" : "password" : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    {...rest}
                />
                {type === "password" && (
                    <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </div>
                )}

            </div>
            {rest.error && <p className="text-red-500 text-sm">{rest.error}</p>}
        </div>
    )
}
export default Input;