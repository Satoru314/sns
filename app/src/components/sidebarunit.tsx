import { Link } from "@tanstack/react-router"
import { Icon } from "../components/icon"
import type { SideBarUnitProps } from "../types/sidebar"
import React from "react"


export function SideBarUnit({
    sideBarUnitProps,
    isOpen
}: {
    sideBarUnitProps: SideBarUnitProps,
    isOpen: boolean
}): React.ReactNode {
    return (
        <div className="rounded-md bg-gray-100">
            <Link to={sideBarUnitProps.link} className="flex justify-between items-center">
                {isOpen && (
                    <div className="text-xl w-full">{sideBarUnitProps.linkName}</div>
                )}
                <Icon className="shrink-0" name={sideBarUnitProps.icon} size={64} />
            </Link>
        </div>
    )
}
