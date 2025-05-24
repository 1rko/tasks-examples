import {useState, useEffect} from 'react';

type Test = {
    id: string
    question: string
    answer: string
}

export const TestApp = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [tests, setTests] = useState([]);

    // Загрузка тестов при монтировании
    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/tests');
            const data = await response.json();
            setTests(data);
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:3001/api/tests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({question, answer}),
            });
            // Обновляем список после сохранения
            fetchTests();
            // Очищаем поля
            setQuestion('');
            setAnswer('');
        } catch (error) {
            console.error('Error saving test:', error);
        }
    };

    return (
        <div>
            <h1>Test Manager</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question:</label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Answer:</label>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save Test</button>
            </form>

            <h2>Saved Tests</h2>
            <ul>
                {tests.length && tests.map((test: Test) => (
                    <li key={test.id}>
                        <h3>Q: {test.question}</h3>
                        <p>A: {test.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
