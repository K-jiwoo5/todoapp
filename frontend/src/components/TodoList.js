import React, { useState } from 'react';

function TodoList({ todos, deleteTodo, updateTodo }) {
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditTask(todo.task);
  };

  const saveEdit = (id) => {
    updateTodo(id, editTask);
    setEditId(null);
    setEditTask('');
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {editId === todo.id ? (
            <>
              <input value={editTask} onChange={e => setEditTask(e.target.value)} />
              <button onClick={() => saveEdit(todo.id)}>Save</button>
            </>
          ) : (
            <>
              {todo.task}
              <button onClick={() => startEdit(todo)}>Edit</button>
            </>
          )}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
