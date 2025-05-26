import s from "./TestsList.module.css";
import {TaskBlock} from "../TaskBlock/TaskBlock.tsx";
import {Tests} from "../AccordionList/AccordionList.tsx";

type Props = {
    tests: Tests
    handleDelete: (testId: number) => void
};
export const TestsList = ({
                              tests,
                              handleDelete
                          }: Props) => {
    return (
        <>
            <h2>Saved Tests ({tests.length})</h2>
            <div className={s.testsList}>
                {tests.map((test) => (
                    <div key={test.id} className={s.testItem}>
                        <TaskBlock
                            id={test.id}
                            topic={test.topic}
                            section={test.section}
                            taskDescription={test.question}
                            question={test.question}
                            answer={test.answer}
                            description={test.answer}
                            deleteTask={() => handleDelete(test.id)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};