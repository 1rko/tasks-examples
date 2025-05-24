import {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import s from './TestNewForm.module.css'
import {Tests} from "../AccordionList/AccordionList.tsx";
import {TaskBlock} from "../TaskBlock/TaskBlock.tsx";

export const TestNewForm = () => {
    const [formData, setFormData] = useState({
        topic: '',
        section: '',
        question: '',
        answer: ''
    });
    const [filters, setFilters] = useState({
        topic: '',
        section: ''
    });
    const [topics, setTopics] = useState([]);
    const [sections, setSections] = useState([]);
    const [suggestions, setSuggestions] = useState({
        topics: [],
        sections: []
    });
    const [tests, setTests] = useState<Tests>([]);

    //const path= 'http://localhost:3001/api/'
    const path = 'https://tasks-examples-back.onrender.com/api/'

    // Загрузка тестов и подсказок при монтировании
    useEffect(() => {
        fetchTopics();
        fetchTests();
        fetchSuggestions();
    }, []);

    useEffect(() => {
        if (filters.topic) {
            fetchSections(filters.topic);
        } else {
            setSections([]);
        }
        fetchTests();
    }, [filters.topic, filters.section]);

    const fetchTopics = async () => {
        try {
            const response = await fetch(`${path}topics`);
            const data = await response.json();
            setTopics(data);
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    const fetchSections = async (topic: string) => {
        try {
            const response = await fetch(`${path}sections?topic=${encodeURIComponent(topic)}`);
            const data = await response.json();
            setSections(data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const fetchTests = async () => {
        try {
            let url = `${path}tests/filtered`;
            const params = [];

            if (filters.topic) params.push(`topic=${encodeURIComponent(filters.topic)}`);
            if (filters.section) params.push(`section=${encodeURIComponent(filters.section)}`);

            if (params.length) url += `?${params.join('&')}`;

            const response = await fetch(url);
            const data = await response.json();
            setTests(data);
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const fetchSuggestions = async () => {
        try {
            const response = await fetch(`${path}metadata`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement> ) => {
        const {name, value} = e.target;
        setFilters(prev => {
            // Если меняется тема, сбрасываем раздел
            const newFilters = {...prev, [name]: value};
            if (name === 'topic') newFilters.section = '';
            return newFilters;
        });
    };

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetch(`${path}tests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            // Обновляем список тестов и подсказок после сохранения

            fetchTests();
            fetchSuggestions();
            // Очищаем форму
            setFormData({
                topic: '',
                section: '',
                question: '',
                answer: ''
            });
        } catch (error) {
            console.error('Error saving test:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this test?')) {
            try {
                await fetch(`${path}tests/${id}`, {
                    method: 'DELETE',
                });
                // Обновляем список тестов после удаления
                fetchTests();
                fetchSuggestions();
                fetchTopics();
                fetchSections(filters.topic);
            } catch (error) {
                console.error('Error deleting test:', error);
            }
        }
    };

    return (
        <div>
            <h1>Test Manager</h1>

            Фильтры
            <div className="filters">
                <select
                    name="topic"
                    value={filters.topic}
                    onChange={handleFilterChange}
                >
                    <option value="">All Topics</option>
                    {topics.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                </select>

                <select
                    name="section"
                    value={filters.section}
                    onChange={handleFilterChange}
                    disabled={!filters.topic}
                >
                    <option value="">All Sections</option>
                    {sections.map(section => (
                        <option key={section} value={section}>{section}</option>
                    ))}
                </select>

                <button
                    onClick={() => setFilters({topic: '', section: ''})}
                    disabled={!filters.topic && !filters.section}
                >
                    Clear Filters
                </button>
            </div>

            Форма добавления теста ...

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Topic:</label>
                    <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        list="topics-list"
                        required
                    />
                    <datalist id="topics-list">
                        {suggestions.topics.map((topic, i) => (
                            <option key={i} value={topic}/>
                        ))}
                    </datalist>
                </div>

                <div>
                    <label>Section:</label>
                    <input
                        type="text"
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        list="sections-list"
                        required
                    />
                    <datalist id="sections-list">
                        {suggestions.sections.map((section, i) => (
                            <option key={i} value={section}/>
                        ))}
                    </datalist>
                </div>

                <div>
                    <label>Question:</label>
                    <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Answer:</label>
                    <textarea
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Save Test</button>
            </form>

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
                        {/*  <div className={s.testMeta}>
                            <span className={s.topic} > {test.topic}</span> /
                            <span className={s.section} > {test.section}</span>
                            <button
                                onClick={() => handleDelete(test.id)}
                                className={s.deleteBtn}
                                title="Delete test"
                            >
                                ×
                            </button>
                        </div>
                        <h3>Q: {test.question}</h3>
                        <p>A: {test.answer}</p>*/}
                    </div>
                ))}
            </div>

            {/* <AccordionList
                tests={tests}
                deleteTask={handleDelete}
            />*/}

        </div>
    );
}

