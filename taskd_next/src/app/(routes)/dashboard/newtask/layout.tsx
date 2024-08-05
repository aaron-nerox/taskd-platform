import React from "react";

export default function ConnectLayout(
    {children} : Readonly<{children: React.ReactNode}>
) {
    return <div>{children}</div>
}