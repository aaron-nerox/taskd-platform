import React from "react";

export default function ConnectLayout(
    {children} : Readonly<{children: React.ReactNode}>
) {
    return <div className="w-full max-h-screen overflow-hidden">
        {children}
    </div>
}