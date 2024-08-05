import Link from "next/link";

export default function LinkButton(
    props: {
        link: string,
        text: string,
        className: string
    }
) {
    return <div
        className={props.className + " rounded-full grid items-center justify-center px-4 py-2"}
    >
        <Link
            href={props.link}
            className="text-lg font-bold cursor-pointer select-none"
        >{props.text}</Link>

    </div>
}