import {useAutoAnimate} from "@formkit/auto-animate/react";
import {useState} from "react";

type Props = {
    title?: string
    children?: React.ReactNode
}

export const Accordion = (props: Props) => {
    const {
        title,
        children
    } = props
    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleHandler = () => {
        setIsCollapsed(!isCollapsed)
    }

    const [parent] = useAutoAnimate<HTMLDivElement>()

    return (
        <div ref={parent}>
            <h3 onClick={toggleHandler}>{title}</h3>
            {isCollapsed && children}
        </div>
    );
};

