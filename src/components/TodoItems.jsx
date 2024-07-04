import React from "react";
import tick from "../assets/tick.png"; // you can use this image also for tick operation
import tick1 from "../assets/tick1.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img className="w-8" src={isComplete ? tick1 : not_tick} alt="#" />
        <p
          className={`text-slate-700 ml-4 text-[17px]  decoration-slate-700 font-semibold 
            ${isComplete ? "line-through" : ""}
          `}
        >
          {" "}
          {text}{" "}
        </p>
      </div>
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        src={delete_icon}
        alt="#"
        className="w-5 cursor-pointer"
      />
    </div>
  );
};

export default TodoItems;
