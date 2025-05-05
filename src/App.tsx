import './App.css'
import {Accordion} from "./components/Accordion/Accordion.tsx";
import {subjects, tasks, topics} from "./data/data.tsx";
import {TaskBlock} from "./components/TaskBlock/TaskBlock.tsx";
import {useAutoResizeTextareas} from "./utils/useAutoResizeTextareas.ts";


function App() {

    useAutoResizeTextareas();               //функция для подстраивания размера textarea по высоте контента

    const allSubjects = subjects.map(subj => (
        <Accordion key={subj.id}
                   title={subj.title}
        >
            {topics[subj.id] &&
                topics[subj.id].map(topic => (
                    <Accordion key={topic.id}
                               title={topic.title}
                    >
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
                    </Accordion>))
            }
        </Accordion>
    ))

    return (
        <>
            <div>
                {allSubjects}
            </div>
        </>
    )
}

export default App
