'use client'

import LottieLoading from "@/components/base/LottieLoading";

export default function connectLoading() {
    return <div className={"w-full h-screen grid items-center justify-center"}>
        <LottieLoading />
    </div>
}