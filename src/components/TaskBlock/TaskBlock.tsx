import {Task} from "../../data/data.tsx";
import s from './taskBlock.module.css'

type Props = Task & {
    topic: string,
    section: string,
    deleteTask: (id: number) => void
}

export const TaskBlock: React.FC<Props> = ({
                                               id,
                                               topic,
                                               section,
                                               taskDescription,
                                               question,
                                               answer,
                                               description,
                                               deleteTask
                                           }) => {
    return (
        <div className={s.topic} key={id}>
            <div className={s.topic}>
                Topic: {topic}
            </div>
            <div className={s.section}>
                Section: {section}
            </div>
            <div className={s.taskDescription}>
                Task description: {taskDescription}
            </div>
            <label> Задача </label>
            <textarea
                className={s.consoleText}
                value={question}
            />
            <textarea
                className={s.consoleText}
                value={answer}
            />
            <div className={s.description}>
                {description}
            </div>
            <button
                onClick={() => deleteTask(id as number)}
                className={s.deleteBtn}
                title="Delete test"
            >
                Удалить задачу
            </button>
        </div>
    );
};
