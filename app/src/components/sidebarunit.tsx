import { Link } from "@tanstack/react-router"
import { Icon } from "../components/icon"
import type { Name } from "../components/icon"
import React from "react"

export type SideBarUnit = {
    isOpen: boolean
    link: string
    icon: Name
    linkName: string
}

export function SideBarUnit(sideBarUnit: SideBarUnit): React.ReactNode {
    return (
        <div className="w-full rounded-md bg-gray-100">
            <Link to={sideBarUnit.link} className="flex">
                {sideBarUnit.isOpen && (
                    <div className="text-sm">{sideBarUnit.linkName}</div>
                )}
                <Icon name={sideBarUnit.icon} size={60} />
            </Link>


        </div>
    )

}