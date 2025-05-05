import {useEffect} from "react";

export const useAutoResizeTextareas = () => {
    useEffect(() => {
        const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;

            // Добавляем обработчик для будущих изменений
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            });
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes) {
                    const textareas = Array.from(mutation.addedNodes).filter(
                        (node): node is HTMLTextAreaElement =>
                            node.nodeName === 'TEXTAREA'
                    );

                    textareas.forEach(adjustTextareaHeight);

                    // Также проверяем вложенные textarea
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const nestedTextareas = (node as Element).querySelectorAll('textarea');
                            nestedTextareas.forEach(adjustTextareaHeight);
                        }
                    });
                }
            });
        });

        // Наблюдаем за всем документом
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Обрабатываем уже существующие textarea
        document.querySelectorAll('textarea').forEach(adjustTextareaHeight);

        return () => {
            observer.disconnect();
            // Удаляем все обработчики при размонтировании
            document.querySelectorAll('textarea').forEach(textarea => {
                textarea.removeEventListener('input', () => {
                });
            });
        };
    }, []);
};
