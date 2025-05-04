import {useAutoAnimate} from "@formkit/auto-animate/react";
import {useState} from "react";

type Props = {
    title: string
    items: string[]
    children?: React.ReactNode
}

export const AccordionItem = (props: Props) => {
    const {
        title,
        items,
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
            {isCollapsed && <ul>
                {items.length ? items.map(item =>
                    <li key={item}>{item}</li>) : null}
            </ul>}
            {children}
        </div>
    );
};
