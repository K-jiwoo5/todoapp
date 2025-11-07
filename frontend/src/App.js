import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!task) return;
    const res = await axios.post('http://localhost:5000/api/todos', { task });
    setTodos([...todos, res.data]);
    setTask('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = async (id, newTask) => {
    await axios.put(`http://localhost:5000/api/todos/${id}`, { task: newTask });
    setTodos(todos.map(todo => todo.id === id ? { ...todo, task: newTask } : todo));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do App</h1>
      <input value={task} onChange={e => setTask(e.target.value)} placeholder="New Task" />
      <button onClick={addTodo}>Add</button>
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
}

export default App;
