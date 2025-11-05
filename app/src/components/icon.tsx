import { AiFillWindows, AiFillAccountBook } from "react-icons/ai";
import { FiSidebar } from "react-icons/fi";
const DefaultSize: number = 40

const icons = { AiFillWindows, AiFillAccountBook, FiSidebar }
export type Name = keyof typeof icons

type props = {
    name: Name
    size?: number
}

export function Icon({ name, size = DefaultSize }: props
) {
    const SVGComponent = icons[name]

    return (
        <SVGComponent style={{ width: size, height: size }} />
    )
}