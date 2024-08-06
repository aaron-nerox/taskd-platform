import {TaskStatus} from "@/enums/TaskStatus";
import {TaskDto} from "@/dto/task.dto";
import Image from "next/image";
import {
    Drawer,
    DrawerClose,
    DrawerContent, DrawerDescription,
    DrawerFooter,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import React from "react";
import {parseDate} from "@/utils/dateUtils";

export default function Task(props: {
    task: TaskDto
    className: string
}) {

    let bg = "";
    const dueDate = parseDate(props.task.dueDate)

    switch(props.task.status) {
        case TaskStatus.Pending : {
            bg = "bg-pending";
            break;
        }
        case TaskStatus.InProgress : {
            bg = "bg-progress";
            break;
        }
        default : {
            bg = "bg-completed";
            break;
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div
                    className={props.className + " p-5 bg-off-white shadow-md rounded-lg inline-flex flex-row items-center justify-between cursor-pointer"}>
                    <div className="w-40% inline-flex flex-row items-center gap-x-4">
                        <div className={bg + " shrink-0 w-5 h-5 rounded-md"}></div>
                        <p className="truncate">{props.task.title}</p>
                    </div>
                    <div className="w-fit inline-flex flex-row items-center gap-x-4">
                        <p className="text-dark/40">Due {dueDate}</p>
                        <Image
                            src={'/assets/icons/arrow_right.svg'}
                            alt={"click for details"}
                            height={24}
                            width={24}
                            className="w-6 h-6"
                        />
                    </div>
                </div>
            </DrawerTrigger>
            <DrawerContent className='bg-off-white outline-none'>
                <div className="h-fit w-2/3 mx-auto grid items-start gap-y-4 mb-10">
                    <DrawerTitle className="text-2xl font-bold mt-5">
                        {props.task.title}
                    </DrawerTitle>
                    <DrawerDescription className="text-md font-medium mb-5">
                        {props.task.description}
                    </DrawerDescription>
                    <div className="inline-flex flex-row items-center justify-start gap-x-2">
                        <p className="w-[72px] text-xl">Status: </p>
                        <div
                            className={bg + " text-off-white w-1/5 rounded-full inline-flex flex-row items-center justify-center px-4 py-2 gap-x-3"}>
                            <p className="text-lg font-bold cursor-pointer select-none">{props.task.status}</p>
                        </div>
                    </div>
                    <div className="inline-flex flex-row items-center justify-start gap-x-2 mb-10">
                        <p className="text-xl w-[72px]">Due: </p>
                        <div
                            className={bg + " text-off-white w-fit rounded-full inline-flex flex-row items-center justify-center px-4 py-2 gap-x-3"}>
                            <p className="text-lg font-bold cursor-pointer select-none">{dueDate}</p>
                        </div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <div
                                className="bg-dark text-off-white w-[200px] mx-auto rounded-full inline-flex flex-row items-center justify-center px-4 py-2 gap-x-3">
                                <p className="text-lg font-bold cursor-pointer select-none">Confirm</p>
                            </div>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>


    )
}