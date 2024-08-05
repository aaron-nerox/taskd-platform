'use client'

import Image from "next/image";

export default function TextIconButton(
    props: {
        text: string,
        icon: string,
        className?: string,
        onButtonClick?: () => void
    }
) {
    return <div
        className={props.className + " text-dark rounded-full inline-flex flex-row items-center justify-center px-4 py-2 gap-x-3"}
        onClick={props.onButtonClick}
    >
        {props.icon &&
            <Image
                src={props.icon}
                alt={"button icon"}
                height={24}
                width={24}
                className="h-5 w-5"
            />
        }

        <p className="text-lg font-bold cursor-pointer select-none">
            {props.text}
        </p>

    </div>
}