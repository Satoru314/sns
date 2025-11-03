import { useState } from "react"
import { AiFillWindows } from "react-icons/ai";
export default function SideBar() {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <div className={`${isOpen ? "w-1/4" : "w-16"} min-w-16 bg-blue-100 bg-center`}>
            <button className="bg-center" onClick={() => setIsOpen(!isOpen)} ><AiFillWindows className="w-16 h-20" /></button>
        </div >
    )
}