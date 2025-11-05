import { AiFillWindows, AiFillAccountBook } from "react-icons/ai";
import { FiSidebar } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrArticle } from "react-icons/gr";
import { MdOutlineArticle } from "react-icons/md";

const DefaultSize: number = 40

const icons = { AiFillWindows, AiFillAccountBook, FiSidebar, IoIosAddCircleOutline, GrArticle, MdOutlineArticle }
export type Name = keyof typeof icons

type props = {
    className?: string
    name: Name
    size?: number
}

export function Icon({ className, name, size = DefaultSize }: props
) {
    const SVGComponent = icons[name]

    return (
        <SVGComponent className={className} style={{ width: size, height: size }} />
    )
}