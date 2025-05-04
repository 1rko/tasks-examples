import {v1} from "uuid";

export type Subject = {
    id: string
    title: string
}

export type Topic = {
    id: string
    title: string
}

export type Task = {
    id: string
    question: string
    answer: string
    description: string
}

const subjectId1 = self.crypto.randomUUID();
const subjectId2 = self.crypto.randomUUID();
const subjectId3 = self.crypto.randomUUID();
const subjectId4 = self.crypto.randomUUID();


const topicId1 = self.crypto.randomUUID();
const topicId2 = self.crypto.randomUUID();
const topicId3 = self.crypto.randomUUID();
const topicId4 = self.crypto.randomUUID();

export const subjects: Subject[] = [
    {id: subjectId1, title: 'JS'},
    {id: subjectId2, title: 'TS'},
    {id: subjectId3, title: 'React'},
    {id: subjectId4, title: 'Redux'},
]

export const topics: Record<string, Topic[]> = {
    [subjectId1]: [
        {id: topicId1, title: 'THIS'},
        {id: topicId2, title: 'EVENT LOOP'},
        {id: topicId3, title: 'КАРРИРОВАНИЕ'},
    ],
    [subjectId2]: [
        {id: topicId4, title: 'UTILITY TYPES'},
    ]
}

export const tasks: Record<string, Task[]> = {
    [topicId1]: [
        {
            id: v1(),
            question: 'текст задачи 1',
            answer: 'answer 1',
            description: 'описание 1',
        },
        {
            id: v1(),
            question: 'текст задачи 2',
            answer: 'answer 2',
            description: 'описание 2',
        },
    ],
    [topicId2]: [
        {
            id: v1(),
            question: 'console.log(\'Start\');\n' +
                '\n' +
                'setTimeout(() => console.log(\'Timeout 1\'), 0);\n' +
                '\n' +
                'Promise.resolve()\n' +
                '  .then(() => {\n' +
                '    console.log(\'Promise 1\');\n' +
                '    queueMicrotask(() => console.log(\'Microtask inside Promise\'));\n' +
                '  })\n' +
                '  .then(() => console.log(\'Promise 2\'));\n' +
                '\n' +
                'setTimeout(() => console.log(\'Timeout 2\'), 0);\n' +
                '\n' +
                'console.log(\'End\');',
            answer: 'Start\n' +
                'End\n' +
                'Promise 1\n' +
                'Microtask inside Promise\n' +
                'Promise 2\n' +
                'Timeout 1\n' +
                'Timeout 2',
            description: 'Синхронный код (Start, End).\n' +
                '\n' +
                'Микрозадачи (Promise 1, Microtask inside Promise, Promise 2).\n' +
                '\n' +
                'Макрозадачи (Timeout 1, Timeout 2) в порядке их регистрации.',
        },
        {
            id: v1(),
            question: 'текст задачи 2',
            answer: 'answer 2',
            description: 'описание 2',

        },
    ]
}