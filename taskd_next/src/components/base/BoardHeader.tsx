export default function BoardHeader(
    props: {
        title: string,
        type: "bg-pending" | "bg-progress" | "bg-completed",
        className?: string
    }
) {
    return (
        <div className={"w-full h-[56px] relative grid items-center justify-center bg-off-white rounded-t-lg  shadow-md select-none"}>
            <p className={"text-lg font-medium text-center text-dark"}>
                {props.title}
            </p>
            <div className={"shrink-0 w-full h-1 absolute bottom-0 " + props.type}></div>
        </div>
    )
}