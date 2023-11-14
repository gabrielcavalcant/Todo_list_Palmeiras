import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'; // Importe o arquivo de estilo para adicionar a classe white-text

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];

/**
 * Componente `TodoWrapper` é o componente principal que gerencia a lista de tarefas.
 *
 * @returns {JSX.Element} - Um elemento JSX que representa a aplicação To-Do.
 */
export const TodoWrapper = () => {
  const [todos, setTodos] = useState(initialTodos);

  // Efeito colateral que atualiza o LocalStorage sempre que a lista de todos é modificada.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /**
   * Exibe notificações.
   *
   * @param {string} message - A mensagem da notificação.
   */
  const notify = (message) => {
    // Personalize o estilo da notificação com base na mensagem
    toast(message, { position: "bottom-right", autoClose: 5000, style: { background: message.includes('concluída') ? '#35b130' : '#ff8c00' } });
  };

  /**
   * Adiciona uma nova tarefa à lista.
   *
   * @param {string} todoText - Texto da nova tarefa.
   */
  const addTodo = (todoText) => {
    const newTodo = {
      id: uuidv4(),
      task: todoText,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
    notify('Tarefa adicionada com sucesso!');
  };

  /**
   * Exclui uma tarefa da lista.
   *
   * @param {string} id - ID da tarefa a ser excluída.
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    notify('Tarefa excluída com sucesso!');
  };

  /**
   * Alterna o status de conclusão de uma tarefa.
   *
   * @param {string} id - ID da tarefa a ser alterada.
   */
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const completedTodo = todos.find((todo) => todo.id === id);
    const message = completedTodo.completed
      ? 'Tarefa marcada como não concluída!'
      : 'Tarefa marcada como concluída!';
    notify(message);
  };

  /**
   * Alterna o modo de edição de uma tarefa.
   *
   * @param {string} id - ID da tarefa a ser editada.
   */
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
    notify('Estado da tarefa alterado com sucesso!');
  };

  /**
   * Edita o texto de uma tarefa.
   *
   * @param {string} editedTask - Texto editado da tarefa.
   * @param {string} id - ID da tarefa a ser editada.
   */
  const editTask = (editedTask, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: editedTask, isEditing: false } : todo
      )
    );
    notify('Tarefa editada com sucesso!');
  };

  // Função para calcular o número total de tarefas
  const getTotalTasks = () => todos.length;

  // Função para calcular o número de tarefas concluídas
  const getCompletedTasks = () => todos.filter((todo) => todo.completed).length;

  return (
    <div className='TodoWrapper white-text'> {/* Adicione a classe white-text */}
      <h1>LISTA DE TAREFAS DE UM PALMEIRENSE FELIZ!</h1>
      <TodoForm addTodo={addTodo} />

      <TransitionGroup>
        {todos.map((todo) => (
          <CSSTransition key={todo.id} timeout={500} classNames="slide">
            {todo.isEditing ? (
              <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
              <Todo
                task={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            )}
          </CSSTransition>
        ))}
      </TransitionGroup>
      
      <div className="task-info">
        <p>Total de Tarefas: {getTotalTasks()}</p>
        <p>Tarefas Concluídas: {getCompletedTasks()}</p>
      </div>

      <ToastContainer />
    </div>
  );
};
