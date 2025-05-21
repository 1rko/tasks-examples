import {useAutoResizeTextareas} from "../../utils/useAutoResizeTextareas.js";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {TaskBlock} from "../TaskBlock/TaskBlock.js";

export type Test = {
    id: number
    topic: string
    section: string
    question: string
    answer: string
}

export type Tests = Test[]

type Props = {
    tests: Tests
    deleteTask: (id: number) => void
};
export const AccordionList: React.FC<Props> = ({
                                                   tests,
                                                   deleteTask,
                                               }) => {

    useAutoResizeTextareas();               //функция для подстраивания размера textarea по высоте контента

    const allSubjects = tests.length ?
        <>
            {tests.length &&
                tests.map(test => (
                    <>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component="span">{test.topic}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Темы
                                </Typography>
                                {
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ArrowDownwardIcon/>}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <Typography component="span">{test.section}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography sx={{fontWeight: 700}}>
                                                Список задач
                                            </Typography>
                                            <TaskBlock
                                                id={test.id}
                                                taskDescription={test.question}
                                                question={test.question}
                                                answer={test.answer}
                                                description={test.answer}
                                                deleteTask={deleteTask}
                                            />
                                        </AccordionDetails>
                                    </Accordion>}
                            </AccordionDetails>
                        </Accordion>
                    </>
                    /* : null*/
                ))
            }

        </>
        :
        'Список задач пуст'

    return (
        <div>
            {allSubjects}
        </div>
    );
};