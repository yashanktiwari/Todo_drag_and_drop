import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [curTimestamp, setCurTimestamp] = useState("");

  useEffect(() => {
    const arr = localStorage.getItem("tasks");
    if (arr) {
      setTasks(JSON.parse(arr));
    }
  }, [curTimestamp]);

  // Add new functionality
  const [desc, setDesc] = useState("");
  const handleAdd = () => {
    setCurTimestamp(Date.now() + "");

    if (localStorage.getItem("tasks")) {
      const arr = localStorage.getItem("tasks");
      let tasks = JSON.parse(arr);
      const obj = {
        id: Date.now() + "",
        description: desc,
        status: "new",
      };
      tasks.push(obj);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      let tasks = [];
      const obj = {
        id: Date.now() + "",
        description: desc,
        status: "new",
      };
      tasks.push(obj);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  const changeStatus = (taskid) => {
    tasks.map((task, index) => {
      if (task.id === taskid) {
        if (task.status === "new") {
          task.status = "ongoing";
          localStorage.setItem("tasks", JSON.stringify(tasks));
        } else if (task.status === "ongoing") {
          task.status = "completed";
          localStorage.setItem("tasks", JSON.stringify(tasks));
        } else if (task.status === "completed") {
          const temp = localStorage.getItem("tasks");
          if (!temp) return null;
          let arr = JSON.parse(temp);
          arr.splice(index, 1);
          localStorage.setItem("tasks", JSON.stringify(arr));
        }
        setCurTimestamp(Date.now() + "");
      }
    });
  };

  // Drag and Drop functionality
  const [flag, setFlag] = useState(false);

  const handleDrag = (e, id) => {
    e.dataTransfer.setData("task", id);
    setFlag(true);
  };

  const handleDropNew = (e) => {
    setFlag(false);
    const id = e.dataTransfer.getData("task");
    tasks.map((task) => {
      if (task.id === id) {
        task.status = "new";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setCurTimestamp(Date.now() + "");
      }
    });
  };

  const handleDropCompleted = (e) => {
    setFlag(false);
    const id = e.dataTransfer.getData("task");
    tasks.map((task) => {
      if (task.id === id) {
        task.status = "completed";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setCurTimestamp(Date.now() + "");
      }
    });
  };

  const handleDropOngoing = (e) => {
    setFlag(false);
    const id = e.dataTransfer.getData("task");
    tasks.map((task) => {
      if (task.id === id) {
        task.status = "ongoing";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setCurTimestamp(Date.now() + "");
      }
    });
  };

  const handleDropDeleted = (e) => {
    const id = e.dataTransfer.getData("task");
    tasks.map((task, index) => {
      if (task.id === id) {
        let temp = localStorage.getItem("tasks");
        let arr = JSON.parse(temp);
        arr.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(arr));
        setFlag(false);
        setCurTimestamp(Date.now() + "");
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="bg-black h-[100vh] py-6">
        <p className="text-gray-100 font-kanit text-3xl ml-[45rem] ">
          To-do List
        </p>

        {/* Add New */}
        <div className="flex h-28 bg-black justify-center items-center">
          <div className="border border-gray-300 rounded-[3rem] py-3 px-6 bg-slate-200 flex justify-between w-[30rem]">
            <form>
              <input
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                placeholder="Add a new task..."
                className="rounded-[2rem] bg-transparent focus:outline-none mr-2 font-kanit text-lg w-[25rem]"
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (desc.length !== 0) handleAdd();
                  setDesc("");
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="text-lg" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-around bg-black">
          {/* New Task */}
          <div className="h-[28rem] w-96">
            <div className="flex justify-center h-12 bg-gray-900 items-center">
              <p className="font-kanit text-2xl text-gray-100">New Tasks</p>
            </div>
            <div
              className="bg-gray-800 overflow-hidden overflow-y-scroll h-[91%] py-4 px-4"
              onDrop={handleDropNew}
              onDragOver={handleDragOver}
            >
              {tasks &&
                tasks.map((task, index) => {
                  return task.status === "new" ? (
                    <div
                      key={task.id}
                      className="flex bg-gray-700 h-16 mb-4 items-center"
                      draggable
                      onDragStart={(e) => {
                        handleDrag(e, task.id);
                      }}
                      onDragEnd={() => {
                        setFlag(false);
                      }}
                    >
                      <div className="overflow-clip h-full w-60 px-4 py-4 bg-gray-700 text-gray-100">
                        {task.description}
                      </div>
                      <button
                        onClick={() => {
                          changeStatus(task.id);
                        }}
                      >
                      </button>
                    </div>
                  ) : null;
                })}
            </div>
          </div>

          {/* Tasks in progress */}
          <div className="h-[28rem] w-96">
            <div className="flex justify-center h-12 bg-gray-900 items-center">
              <p className="font-kanit text-2xl text-gray-100">Ongoing Tasks</p>
            </div>

            <div
              className="bg-gray-800 overflow-hidden overflow-y-scroll h-[91%] py-4 px-4"
              onDrop={handleDropOngoing}
              onDragOver={handleDragOver}
            >
              {tasks &&
                tasks.map((task) => {
                  return task.status === "ongoing" ? (
                    <div
                      key={task.id}
                      className="flex bg-gray-700 h-16 mb-4 items-center"
                      draggable
                      onDragStart={(e) => {
                        handleDrag(e, task.id);
                      }}
                      onDragEnd={() => {
                        setFlag(false);
                      }}
                    >
                      <div className="overflow-clip h-full w-60 px-4 py-4 bg-gray-700 text-gray-100">
                        {task.description}
                      </div>
                      <button
                        onClick={() => {
                          changeStatus(task.id);
                        }}
                      >
                      </button>
                    </div>
                  ) : null;
                })}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="h-[28rem] w-96">
            <div className="flex justify-center h-12 bg-gray-900 items-center">
              <p className="font-kanit text-2xl text-gray-100">
                Completed Tasks
              </p>
            </div>

            <div
              className="bg-gray-800 overflow-hidden overflow-y-scroll h-[91%] py-4 px-4"
              onDrop={handleDropCompleted}
              onDragOver={handleDragOver}
            >
              {tasks &&
                tasks.map((task) => {
                  return task.status === "completed" ? (
                    <div
                      key={task.id}
                      className="flex bg-gray-700 h-16 mb-4 items-center"
                      draggable
                      onDragStart={(e) => {
                        handleDrag(e, task.id);
                      }}
                      onDragEnd={() => {
                        setFlag(false);
                      }}
                    >
                      <div className="overflow-clip h-full w-60 px-4 py-4 bg-gray-700 text-gray-100">
                        {task.description}
                      </div>
                      <button
                        onClick={() => {
                          changeStatus(task.id);
                        }}
                      >
                      </button>
                    </div>
                  ) : null;
                })}
            </div>
          </div>
        </div>

        {flag ? (
          <div className="mt-6 w-full flex justify-center">
            <FontAwesomeIcon
              icon={faTrash}
              className="text-red-500 text-3xl rounded-full border border-red-500 p-3"
              onDrop={handleDropDeleted}
              onDragOver={handleDragOver}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
