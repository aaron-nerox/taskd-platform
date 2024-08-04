import React from "react";

export default function ConnectLayout(
    {children} : Readonly<{children: React.ReactNode}>
) {
    return <div>
        {/*TODO: side bar here*/}
        <div>
            This will be a side bar
        </div>
        {children}
    </div>
}