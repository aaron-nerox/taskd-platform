'use client'

import Image from "next/image";
import {useRouter} from "next/navigation";
import TextIconButton from "@/components/Button";


export default function Home() {
    const router = useRouter();
    return (
        <div className="w-full h-screen inline-flex flex-col justify-center items-center text-off-white">
            <div className="inline-flex flex-col justify-center items-center gap-y-10">
                <Image
                    src={'/assets/images/task_main_logo.svg'}
                    alt={"tasks main logo"}
                    height={420}
                    width={200}
                    className="w-1/2"
                    />
                <p className="w-1/2 leading-relaxed text-xl font-bold text-center ">
                    An unexpected error happened please refresh your page or visit us again later.
                </p>
                <TextIconButton
                    text={"Refresh"}
                    icon={'/assets/icons/rotate_right.svg'}
                    onButtonClick={router.refresh}
                />
            </div>

        </div>
    );
}