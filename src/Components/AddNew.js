import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddNew = (tasksArr) => {
  const [desc, setDesc] = useState("");
  const handleAdd = () => {
    if(localStorage.getItem('tasks')) {
      const arr = localStorage.getItem('tasks');
      let tasks = JSON.parse(arr);
      const obj = {
        description: desc,
        status: "new",
      };
      tasks.push(obj);
      console.log(typeof(tasksArr));
      // tasksArr.push(obj);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      let tasks = [];
      const obj = {
        description: desc,
        status: "new",
      };
      tasks.push(obj);
      tasksArr.push(obj);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };

  return (
    <>
      <div className="flex h-28 bg-black justify-center items-center">
        <div className="border border-gray-300 rounded-[3rem] py-3 px-6 bg-slate-200 flex justify-between w-[30rem]">
          <input
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            placeholder="Add a new task..."
            className="rounded-[2rem] bg-transparent focus:outline-none mr-2 font-kanit text-lg w-[25rem]"
          />
          <button onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} className="text-lg" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNew;
