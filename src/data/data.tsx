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
    id: string | number
    taskDescription: string
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

//Главные разделы
export const subjects: Subject[] = [
    {id: subjectId1, title: 'JS'},
    {id: subjectId2, title: 'TS'},
    {id: subjectId3, title: 'React'},
    {id: subjectId4, title: 'Redux'},
]

//Темы в разделах
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

//Задачи по разделам
export const tasks: Record<string, Task[]> = {
    [topicId1]: [
        {
            id: v1(),
            taskDescription: 'Что выведется в консоль?',
            question: 'const user = {\n' +
                '  name: \'Alex\',\n' +
                '  greet() {\n' +
                '    console.log(`Hello, ${this.name}!`);\n' +
                '  }\n' +
                '};\n' +
                '\n' +
                'const greet = user.greet;\n' +
                'greet(); // Что выведет?',
            answer: 'Hello, undefined! (или ошибка в strict mode)',
            description: 'При присваивании greet = user.greet теряется контекст user. Функция вызывается как обычная (не метод), поэтому this будет window (или undefined в strict mode).',
        },
        {
            id: v1(),
            taskDescription: 'Что выведется в консоль?',
            question: 'const user = {\n' +
                '  name: \'Anna\',\n' +
                '  greet: () => {\n' +
                '    console.log(`Hi, ${this.name}!`);\n' +
                '  }\n' +
                '};\n' +
                '\n' +
                'user.greet(); // Что выведет?',
            answer: 'Hi, undefined!',
            description: 'Стрелочные функции не имеют своего this и берут его из внешнего лексического окружения (в данном случае — глобальный объект window или undefined в strict mode).',
        },
        {
            id: v1(),
            taskDescription: 'Что выведется в консоль?',
            question: 'const timer = {\n' +
                '  seconds: 10,\n' +
                '  start() {\n' +
                '    setTimeout(function() {\n' +
                '      console.log(this.seconds);\n' +
                '    }, 1000);\n' +
                '  }\n' +
                '};\n' +
                '\n' +
                'timer.start(); ',
            answer: 'undefined',
            description: 'Колбэк в setTimeout вызывается как обычная функция, поэтому this теряется и указывает на глобальный объект.\n' +
                'Исправления:\n' +
                '\n' +
                'Использовать стрелочную функцию (берет this из start):\n' +
                '\n' +
                'javascript\n' +
                'setTimeout(() => console.log(this.seconds), 1000);\n' +
                'Привязать контекст:\n' +
                '\n' +
                'javascript\n' +
                'setTimeout(function() {\n' +
                '  console.log(this.seconds);\n' +
                '}.bind(this), 1000);\n',
        },
        {
            id: v1(),
            taskDescription: 'описание задания 2',
            question: 'текст задачи 2',
            answer: 'answer 2',
            description: 'описание 2',
        },
    ],          //This
    [topicId2]: [
        {
            id: v1(),
            taskDescription: 'описание задания 1',
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
            taskDescription: 'описание задания 2',
            question: 'текст задачи 2',
            answer: 'answer 2',
            description: 'описание 2',
        },
    ],          //EVENT LOOP
    [topicId3]: [
        {
            id: v1(),
            taskDescription: 'написать функцию каррирования',
            question: 'написать функциюю каррирования',
            answer: 'function curry(func) {\n' +
                '    return function curried(...args) {\n' +
                '        if (args.length >= func.length) {\n' +
                '            return func.apply(this, args);\n' +
                '        } else {\n' +
                '            return function(...args2) {\n' +
                '                return curried.apply(this, args.concat(args2));\n' +
                '            }\n' +
                '        }\n' +
                '    };\n' +
                '}',
            description: '**Только функции с фиксированным количеством аргументов**',
        }
    ]            //КАРРИРОВАНИЕ
}

