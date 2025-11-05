import React, { useState } from "react"
import { Icon } from "../components/icon"
import { SideBarUnit } from "../components/sidebarunit"
import type { SideBarUnitProps } from "../types/sidebar"

const sideBarUnitProps: SideBarUnitProps[] = [
    { icon: "MdOutlineArticle", link: "/", linkName: "記事一覧" },
    { icon: "IoIosAddCircleOutline", link: "/articles/new", linkName: "記事作成" },
    { icon: "AiFillAccountBook", link: "/", linkName: "hello" }
]

export default function SideBar(): React.ReactNode {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <div className={`${isOpen ? "w-1/4" : "w-16"} min-w-16 bg-blue-100 bg-center`}>
            <button className="bg-center" onClick={() => setIsOpen(!isOpen)} >
                <Icon name="FiSidebar" size={64} />
            </button>
            {sideBarUnitProps.map((value, index) => (
                <SideBarUnit key={index} sideBarUnitProps={value} isOpen={isOpen} />
            ))}
        </div >
    )
}