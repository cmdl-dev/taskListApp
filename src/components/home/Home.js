import React, { useState, useEffect } from "react";
import Tasklist from "../tasklist/tasklist";
import ModalForm from "../modalForm/modalForm";

const Home = () => {
  const sortOptions = [
    { value: "PriorityASC", text: "Priority - ASC" },
    { value: "PriorityDSC", text: "Priority - DESC" },
    { value: "DueASC", text: "Due Date - ASC" },
    { value: "DueDSC", text: "Due Date - DESC" },
  ];
  const optionValue = {
    LOW: 1,
    MED: 2,
    HIGH: 3,
  };
  const [taskList, setTaskList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(-1);
  const [formInfo, setFormInfo] = useState({});
  const [filterOption, setFilterOption] = useState(sortOptions[0].value);

  useEffect(() => {
    /**
     * Initiallizing the Tasklist array with what is in localstorage or with an
     * empty array
     */
    const list = JSON.parse(localStorage.getItem("TASKLIST")) || [];
    setTaskList(sortTasks(list));
  }, []);

  useEffect(() => {
    /**
     * Whenever a taskList gets changed Make sure to save it into the localstorage
     * as TASKLIST
     */
    localStorage.setItem("TASKLIST", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    /**
     * Whenever a changed happens to filteroptions sort the current task list and
     * update the tasklist
     */
    if (taskList.length > 0) {
      const sortedTasks = sortTasks(taskList);
      setTaskList(sortTasks([...sortedTasks]));
    }
  }, [filterOption]);

  const sortTasks = arr => {
    if (arr.length === 0) {
      return arr;
    }
    switch (filterOption) {
      case "PriorityDSC":
        arr.sort((a, b) => {
          if (optionValue[a.priority] < optionValue[b.priority]) {
            return 1;
          } else if (optionValue[a.priority] > optionValue[b.priority]) {
            return -1;
          }
          return 0;
        });
        break;

      case "PriorityASC":
        arr.sort((a, b) => {
          if (optionValue[a.priority] > optionValue[b.priority]) {
            return 1;
          } else if (optionValue[a.priority] < optionValue[b.priority]) {
            return -1;
          }
          return 0;
        });
        break;
      case "DueASC":
        arr.sort((a, b) => {
          // console.log(a.dueDate, b.dueDate, a.dueDate > b.dueDate);
          if (a.dueDate > b.dueDate) {
            return 1;
          } else if (a.dueDate < b.dueDate) {
            return -1;
          }
          return 0;
        });
        break;

      case "DueDSC":
        arr.sort((a, b) => {
          // console.log(a.dueDate, b.dueDate, a.dueDate < b.dueDate);
          if (a.dueDate < b.dueDate) {
            return 1;
          } else if (a.dueDate > b.dueDate) {
            return -1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
    return arr;
  };
  const handleEditTask = (task, index) => {
    /**
     * Handles whenever a person wants to edit a their tasks
     * Put the edit Task as the index of which task that I want to edit
     * Pass in the form information to the modal
     */
    setEditTask(index);
    setFormInfo(task);
    handleShowModal();
  };
  const handleDeleteTask = index => {
    /**
     * Handles the deleting for the tasklist removes the task from the list and updates
     * the tasklist
     */
    taskList.splice(index, 1);
    setTaskList([...taskList]);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    /**
     * We have to reset all the information when we close the modal
     */
    setEditTask(-1);
    setShowModal(false);
    setFormInfo({});
  };
  const handleAddTask = taskInfo => {
    /**
     * If the edit index is less than 0 i.e We are adding a new task
     * then we just update the new task after we pass it in to sort it based on the current filter
     *
     * Otherwise if we are editting a task then have to remove the task then add the new editted task
     * making sure to update the tasklist after we pass it in to sort it based on the current filters
     */
    if (editTask < 0) {
      setTaskList([...sortTasks([...taskList, taskInfo])]);
    } else {
      taskList.forEach((task, index) => {
        if (index === editTask) {
          taskList.splice(index, 1);
          taskList.push(taskInfo);
        }
      });
      setTaskList([...sortTasks([...taskList])]);
    }
    handleCloseModal();
  };
  return (
    <div className="m-3 card">
      <div className="card-body">
        <h2 className="card-title text-center">Task List</h2>
        <div className="row">
          <select
            className="form-control form-control-sm col-md-3 col-5"
            value={filterOption}
            onChange={e => setFilterOption(e.target.value)}
          >
            {sortOptions.map((option, index) => {
              return (
                <option key={index} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
          <button
            className="col-md-2 col-6 btn btn-primary btn-sm ml-auto"
            type="button"
            onClick={handleShowModal}
          >
            <i className="fa fa-plus-circle"></i> Add
          </button>
        </div>
        <Tasklist
          taskList={taskList}
          deleteTask={handleDeleteTask}
          editTask={handleEditTask}
        />
      </div>

      {/* start of the modal */}
      {showModal && (
        <ModalForm
          formInfo={formInfo}
          closeModal={handleCloseModal}
          addTask={handleAddTask}
        />
      )}
    </div>
  );
};

export default Home;
