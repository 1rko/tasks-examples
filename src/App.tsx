import './App.css'
import {subjects, tasks, topics} from "./data/data.tsx";
import {TaskBlock} from "./components/TaskBlock/TaskBlock.tsx";
import {useAutoResizeTextareas} from "./utils/useAutoResizeTextareas.ts";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {TestNewForm} from "./components/TestNewForm/TestNewForm.tsx";
import {AccordionList} from "./components/AccordionList/AccordionList.tsx";

function App() {

    /*useAutoResizeTextareas();               //функция для подстраивания размера textarea по высоте контента

    const allSubjects = subjects.map(subj => (

        <Accordion key={subj.id}>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">{subj.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Темы
                </Typography>
                {topics[subj.id] &&
                    topics[subj.id].map(topic => (
                        <Accordion key={topic.id}
                        >
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component="span">{topic.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{fontWeight: 700}}>
                                    Список задач
                                </Typography>
                                {
                                    tasks[topic.id] &&
                                    tasks[topic.id].map(task => (
                                        <TaskBlock
                                            key={task.id}
                                            id={task.id}
                                            taskDescription={task.taskDescription}
                                            question={task.question}
                                            answer={task.answer}
                                            description={task.description}
                                        />))
                                }
                            </AccordionDetails>
                        </Accordion>))
                }
            </AccordionDetails>
        </Accordion>
    ))*/


    return (
        <>
            <div>
                <TestNewForm/>
            </div>
        </>
    )
}

export default App
