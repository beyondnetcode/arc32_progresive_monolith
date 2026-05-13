import React, { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), title: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo Demo (arc32)</h1>
        <p>Demostración de Arquitectura de Referencia</p>
        
        <div className="todo-container">
          <div className="todo-input-group">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="¿Qué hay que hacer?"
              className="todo-input"
            />
            <button onClick={addTodo} className="todo-button">Añadir</button>
          </div>

          <ul className="todo-list">
            {todos.length === 0 && <li className="todo-empty">No hay tareas pendientes</li>}
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <span onClick={() => toggleTodo(todo.id)} className="todo-text">
                  {todo.title}
                </span>
                <button onClick={() => removeTodo(todo.id)} className="todo-delete">×</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tech-stack">
          <span>Clean Architecture</span> • <span>NestJS</span> • <span>React</span> • <span>BMAD-METHOD</span>
        </div>
      </header>
    </div>
  );
}

export default App;
