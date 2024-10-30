"use client";
import { getCookie } from '@/utils/cookies';
import { useEffect, useState } from 'react';

type Task = {
  Id: number;
  Name: string;
  Status: 1 | 2 | 3;
  CreatedOn: Date;
  UpdatedOn: Date;
};

const TodoList = () => {
  const userUUID = getCookie('userUUID');
  const token = getCookie('token');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/task/getAllByUserId/${userUUID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Error fetching tasks');
        const data = await res.json();
        const taskInfo: Task[] = data.Data.TaskInfo;
        setTasks(taskInfo);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Cargando tareas...</div>;

  const filteredTasks = tasks.filter((task) => task.Status === activeStatus);

  return (
    <div className="p-8 max-w-xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-2xl">
      <h1 className="text-3xl font-extrabold mb-10 text-center text-blue-700 tracking-wider">
        Lista de Tareas
      </h1>

      {/* Menú de Títulos Mejorado */}
      <div className="flex justify-between mb-8 bg-white rounded-full shadow-sm p-1">
        {[
          { label: 'Pendientes', status: 1, color: 'blue-500' },
          { label: 'En Progreso', status: 2, color: 'blue-500' },
          { label: 'Completadas', status: 3, color: 'blue-500' }
        ].map(({ label, status, color }) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`relative px-6 py-2 text-sm font-semibold rounded-full transition-all
              ${activeStatus === status ? `text-white bg-${color}` : `text-gray-500 hover:bg-${color} hover:text-blue-500`}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}`}
          >
            {label}
            {activeStatus === status && (
              <span
                className={`absolute inset-0 rounded-full transition transform bg-${color} opacity-70 blur-sm`}
              ></span>
            )}
          </button>
        ))}
      </div>

      {/* Tareas Filtradas */}
      <div className="mt-6 space-y-4">
        {filteredTasks.length > 0 ? (
          <ul>
            {filteredTasks.map((task) => (
              <li
                key={task.Id}
                className={`p-4  transition transform hover:scale-105 hover:shadow-lg
                  ${
                    activeStatus === 1
                      ? 'bg-gradient-to-r from-sky-100 to-sky-200 text-blue-800'
                      : activeStatus === 2
                      ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900'
                      : 'bg-gradient-to-r from-green-100 to-green-200 text-green-900'
                  }`}
              >
                <h2 className="font-semibold text-lg">{task.Name}</h2>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No hay tareas en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
