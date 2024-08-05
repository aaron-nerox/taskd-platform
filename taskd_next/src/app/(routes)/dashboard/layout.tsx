'use client'

import React from "react";
import TextIconButton from "@/components/base/Button";
import {usePathname, useRouter} from "next/navigation";
import { logout } from "@/api/logout.api";
import {toast} from "@/components/ui/use-toast";

export default function SummaryLayout(
    {children} : Readonly<{children: React.ReactNode}>
) {
    const router = useRouter();
    const pathName = usePathname()
    const routes = [
        {
            route: "/dashboard",
            name: "Your Summary"
        },
        {
            route: "/dashboard/tasks",
            name: "Your Tasks"
        },
        {
            route: "/dashboard/newtask",
            name: "Create a task"
        }
    ]

    const logUserOut = () => {
        logout(router).then(() => {
            toast({
                variant: "default",
                title: "Logged out, see ya later 🥹",
            })
        }).catch(error => {
            toast({
                variant: "destructive",
                title: "Failed to logout",
                description: "It might be on us, But, make sure your internet connection is stable."
            })
        })
    }


    return <div className="w-full h-screen p-3 inline-flex flex-row items-center gap-x-3">
        <div className="w-[360px] h-full bg-dark/30 rounded-lg inline-flex flex-col items-center justify-between p-4">
            <div className="w-full inline-flex flex-col items-center gap-y-3">
                {routes.map(route => {
                    const isRouteActive = pathName == route.route
                    const bg = isRouteActive ? "bg-off-white text-dark " : "bg-dark/30 text-off-white hover:bg-dark/40 "
                    return <TextIconButton
                        key={route.name}
                        text={route.name}
                        icon={''}
                        onButtonClick={() => {router.push(route.route)}}
                        className={bg + " w-full rounded-lg transition-all ease-in-out"}
                    />
                })}
            </div>
            <TextIconButton
                text={'Logout'}
                icon={''}
                onButtonClick={logUserOut}
                className="w-full rounded-lg shadow-lg  bg-off-white"
            />
        </div>
        <div className="w-full h-full bg-dark/30 rounded-lg">
            {children}
        </div>
    </div>
}