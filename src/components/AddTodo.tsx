"use client"
import { getCookie } from '@/utils/cookies';
import { useState } from 'react';

const AddTodo = () => {
    const token = getCookie('token');
    const userUUID = getCookie('userUUID');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [taskName, setTaskName] = useState('');

    const handleAddClick = () => setIsFormOpen(!isFormOpen);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('/api/task/createTask', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ UserId: userUUID, Name: taskName
             }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setTaskName('');
            setIsFormOpen(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="fixed bottom-6 right-6 flex flex-col items-end">
            <button
                onClick={handleAddClick}
                className="w-14 h-14 flex items-center justify-center bg-blue-500 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transition-all"
                aria-label="Add Todo"
            >
                +
            </button>

            {isFormOpen && (
                <form
                    onSubmit={handleSubmit}
                    className="mt-3 bg-white p-4 rounded-md shadow-lg w-64"
                >
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Nueva tarea"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="mt-3 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
                    >
                        Agregar Tarea
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddTodo;
