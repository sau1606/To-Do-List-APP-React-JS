import React, { useEffect, useRef, useState } from "react";
import icon from "../assets/icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      add();
    }
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-10/12 max-w-md flex flex-col p-7 ml-0 min-h-[500px] rounded-xl sm:max-w-md sm:min-h-[500px] sm:p-4">
      {/* Title */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-10" src={icon} alt="icon" />
        <h1 className="text-3xl font-bold">To-DO List</h1>
        <img className="w-10 mx-2" src={icon} alt="icon" />
      </div>

      {/* Input field */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="add your task ..."
          // Added event listener for Enter key press
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-purple-700 text-white w-32 h-12 cursor-pointer text-lg font-medium"
        >
          add +
        </button>
      </div>

      {/* To-do list content */}
      <div>
        {todoList.map((item, index) => (
          <TodoItems
            key={index}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
