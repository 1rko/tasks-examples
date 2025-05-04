import './App.css'
import {Accordion} from "./components/Accordion/Accordion.tsx";
import {subjects, tasks, Topic, topics} from "./data/data.tsx";
import {FormEvent} from "react";

function App() {
    const getTopics = (subjectId: string) => {
        if (topics[subjectId]) {
            const topicTitles = topics[subjectId].map(topic => topic)
            return topicTitles
        } else return []
    }

    const autoResizeTextarea = (e: FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        target.style.height = 'auto';
        target.style.height = target.scrollHeight + 'px';
    };


    const allSubjects = subjects.map(subj => (
        <Accordion key={subj.id}
                   title={subj.title}
                   items={getTopics(subj.id)}
        >
            {topics[subj.id] &&
                topics[subj.id].map(topic => (
                    <Accordion key={topic.id}
                               title={topic.title}
                               items={getTopics(topic.id)}
                    >
                        {
                            tasks[topic.id] &&
                            tasks[topic.id].map(task => (
                                <>
                                    <textarea
                                        onFocus={autoResizeTextarea}
                                        style={{minHeight: '100px'}}
                                    >
                                        {task.question}
                                    </textarea>

                                    <textarea
                                        onFocus={autoResizeTextarea}
                                        style={{minHeight: '100px'}}
                                    >
                                        {task.answer}
                                    </textarea>
                                    <Accordion key={task.id}
                                               title={task.question}
                                               items={getTopics(task.id)}
                                    >
                                    </Accordion>
                                </>))
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
