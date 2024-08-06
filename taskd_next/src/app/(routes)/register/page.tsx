'use client'

import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {register} from "@/api/login.api";
import Image from "next/image";
import IconInput from "@/components/base/IconInput";
import TextIconButton from "@/components/base/Button";

export default function RegisterPage() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { toast } = useToast();
    const router = useRouter();

    const handleRegistration = () => {
        register(username, email, password)
            .then((result) => {
                router.push('/dashboard');
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Error registering a new account",
                    description: "It might be on us, But, Check your internet connection and try again."
                })
            })
    }

    return <div className="w-full h-screen inline-flex flex-row items-center m-0 p-5">
        <div className="w-1/2 h-screen text-off-white inline-flex flex-col items-center justify-center">
            <Image
                src={'/assets/images/task_main_logo.svg'}
                alt={"task main logo"}
                width={300}
                height={200}
                className="w-1/3"
            />
            <p className="w-1/2 my-10 text-3xl font-semibold text-center leading-relaxed">
                Your unusual way of tackling your daily tasks
            </p>
        </div>
        <div className="bg-dark/40 w-1/2 h-full rounded-xl shadow-xl shadow-dark/20 inline-flex flex-col items-center justify-center gap-y-5">
            <p className="w-3/4 text-off-white text-3xl text-center leading-relaxed mb-5">
                Connect into your dashboard and increase your productivity to unimagined levels
            </p>
            <IconInput
                icon={'/assets/icons/user.svg'}
                type={'email'}
                label={'Your Email'}
                required={true}
                value={email}
                onValueChange={(e) => {
                    setEmail(e.target.value)
                }}
                className="h-[56px] w-1/2"
            />
            <IconInput
                icon={'/assets/icons/user.svg'}
                type={'text'}
                label={'Your Username'}
                required={true}
                value={username}
                onValueChange={(e) => {
                    setUsername(e.target.value)
                }}
                className="h-[56px] w-1/2"
            />
            <IconInput
                icon={'/assets/icons/check.svg'}
                type={'password'}
                label={'Your password'}
                required={true}
                value={password}
                onValueChange={(e) => {
                    setPassword(e.target.value)
                }}
                className="h-[56px] w-1/2"
            />
            <TextIconButton
                text={'Register'}
                icon={'/assets/icons/login.svg'}
                onButtonClick={handleRegistration}
                className="w-1/5 my-5 bg-off-white"
            />
        </div>
    </div>
}