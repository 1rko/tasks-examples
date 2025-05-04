import {useAutoAnimate} from "@formkit/auto-animate/react";
import {useState} from "react";
import {AccordionItem} from "./AccordionItem.tsx";
import {Topic} from "../../data/data.tsx";

type Props<T> = {
    title: string
    items?: T[]
    children?: React.ReactNode

}

export const Accordion = (props: Props<Topic>) => {
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

    /*const keys = Object.keys(items)
    const dotts=[]
    for (let key in keys) {
        dotts.push(<AccordionItem
            key={items[key].id}
            title={item}
            items={['111', '222']}
        />)
    }*/

        /*const dotts =items.map((item) =>
            <AccordionItem
                key={item.id}
                title={item.title}
                items={['111', '222']}
            />
        )*/

    return (
        <div ref={parent}>
            <h2 onClick={toggleHandler}>{title}</h2>
           {/* {isCollapsed && <ul>
                {dotts}
            </ul> }*/}
            {isCollapsed && children}

        </div>
    );
};

