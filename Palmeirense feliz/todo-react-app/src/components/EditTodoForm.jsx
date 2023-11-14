import React, { useState } from "react";

/**
 * O componente `EditTodoForm` permite editar o texto de uma tarefa existente.
 *
 * @param {Object} task - Um objeto que representa a tarefa a ser editada.
 * @param {function} editTodo - Função chamada para editar o texto da tarefa.
 *
 * @returns {JSX.Element} - Um elemento JSX que representa o formulário de edição de tarefas.
 */
export const EditTodoForm = ({ editTodo, task }) => {
  // Define um estado local 'value' e uma função 'setValue' para atualizar o texto da tarefa.
  const [value, setValue] = useState(task.task);

  /**
   * Manipula o envio do formulário, chamando a função 'editTodo' e atualizando o LocalStorage.
   *
   * @param {Object} e - Objeto do evento de envio do formulário.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Chama a função 'editTodo' passando o novo valor e o ID da tarefa.
    editTodo(value, task.id);

    // Atualiza o LocalStorage com a tarefa editada.
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = savedTodos.map((todo) =>
      todo.id === task.id ? { ...todo, task: value } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // Limpa o campo após a submissão.
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Atualizar tarefa"
      />
      <button type="submit" className="todo-btn">
        Atualizar Tarefa
      </button>
    </form>
  );
};
