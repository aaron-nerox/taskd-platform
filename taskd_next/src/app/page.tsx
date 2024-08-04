'use client'

import Image from "next/image";
import LinkButton from "@/components/LinkButton";

export default function Home() {
    return (
        <div className="w-full h-screen text-off-white inline-flex flex-col items-center justify-center gap-y-4">
                <Image
                    src={'/assets/images/task_main_logo.svg'}
                    alt={"task main logo"}
                    width={300}
                    height={200}
                    className="w-1/4"
                />
                <p className="w-1/3 my-10 text-3xl font-semibold text-center leading-relaxed">
                    Your unusual way of tackling your daily tasks
                </p>
                <div className="inline-flex flex-row items-center gap-x-4">
                    <LinkButton
                        link={'/connect'}
                        text={'Connect'}
                        className="bg-off-white text-dark w-[256px]"
                    />
                    <p>Or</p>
                    <LinkButton
                        link={'/register'}
                        text={'Create a new account'}
                        className="border border-3 border-off-white rounded-full text-off-white w-[256px]"
                    />
                </div>
            </div>
    );
}
