import React, { useState } from "react"
import { Icon } from "../components/icon"
import { SideBarUnit } from "../components/sidebarunit"
export default function SideBar(): React.ReactNode {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <div className={`${isOpen ? "w-1/4" : "w-16"} min-w-16 bg-blue-100 bg-center`}>
            <button className="bg-center" onClick={() => setIsOpen(!isOpen)} >
                <Icon name="FiSidebar" size={64} />
            </button>
            <SideBarUnit isOpen={isOpen} link="http://a4-home-page.vercel.app" icon="AiFillAccountBook" linkName="リンク名" />

        </div >
    )
}