import {FormEvent} from "react";

type Props = {
    topic: string
    topics: string[]
    section: string
    sections: string[]
    question: string
    answer: string
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined
};
export const TestAddingForm = ({
                                   topic,
                                   topics,
                                   section,
                                   sections,
                                   question,
                                   answer,
                                   handleSubmit,
                                   handleChange
                               }: Props) => {
    return (
        <>
            <div>Форма добавления теста</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Topic:</label>
                    <input
                        type="text"
                        name="topic"
                        value={topic}
                        onChange={handleChange}
                        list="topics-list"
                        required
                    />
                    <datalist id="topics-list">
                        {topics.map((topic, i) => (
                            <option key={i} value={topic}/>
                        ))}
                    </datalist>
                </div>

                <div>
                    <label>Section:</label>
                    <input
                        type="text"
                        name="section"
                        value={section}
                        onChange={handleChange}
                        list="sections-list"
                        required
                    />
                    <datalist id="sections-list">
                        {sections.map((section, i) => (
                            <option key={i} value={section}/>
                        ))}
                    </datalist>
                </div>

                <div>
                    <label>Question:</label>
                    <textarea
                        name="question"
                        value={question}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Answer:</label>
                    <textarea
                        name="answer"
                        value={answer}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Save Test</button>
            </form>
        </>
    );
};