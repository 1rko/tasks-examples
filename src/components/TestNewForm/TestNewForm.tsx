import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Tests} from "../AccordionList/AccordionList.tsx";
import {Filters} from "../Filters/Filters.tsx";
import {TestAddingForm} from "../TestAddingForm/TestAddingForm.tsx";
import {TestsList} from "../TestsList/TestsList.tsx";

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

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
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

            {/*Фильтрация заданий по темам и разделам (фильтрация происходит на сервере)*/}
            <Filters filters={filters}
                     topics={suggestions.topics}
                     setFilters={setFilters}
                     sections={sections}
                     handleFilterChange={handleFilterChange}
            />

            {/*Форма добавления нового задания*/}
            <TestAddingForm
                topic={formData.topic}
                topics={suggestions.topics}
                section={formData.section}
                sections={suggestions.sections}
                question={formData.question}
                answer={formData.answer}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />

            {/*Список сохраненных заданий*/}
            <TestsList
                tests={tests}
                handleDelete={handleDelete}
            />
        </div>
    );
}

