import {Task} from "../../data/data.tsx";
import s from './taskBlock.module.css'

export const TaskBlock: React.FC<Task> = ({
                                              id,
                                              taskDescription,
                                              question,
                                              answer,
                                              description
                                          }) => {
    return (
        <div className={s.taskBlock}>
            <div className={s.taskDescription}>
                {taskDescription}
            </div>
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
        </div>
    );
};
