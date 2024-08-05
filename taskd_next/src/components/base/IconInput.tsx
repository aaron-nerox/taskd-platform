import {ChangeEvent} from "react";
import Image from "next/image";


export default function IconInput(props: {
    type: string,
    value: string,
    icon: string,
    label: string,
    className: string,
    required: boolean,
    onValueChange: (newValue: ChangeEvent<HTMLInputElement>) => void,
}) {
    return <div className={props.className + " bg-off-white text-dark rounded-xl inline-flex flex-row items-center justify-start px-4 py-2 gap-x-3"}>
        {props.icon &&
            <Image
                src={props.icon}
                alt={"button icon"}
                height={24}
                width={24}
                className="h-6 w-6 select-none"
            />
        }
        <input
            type={props.type}
            value={props.value}
            name={props.label}
            onChange={props.onValueChange}
            placeholder={props.label}
            required={props.required}
            className="w-full h-full bg-transparent outline-none"
            />
    </div>
}