import React from "react";
import Task from "../task/Task";

const TaskList = ({ taskList, deleteTask, editTask }) => {
  return (
    <div className="mt-3">
      {taskList.length > 0 ? (
        taskList.map((task, index) => {
          return (
            <Task
              key={index}
              task={task}
              index={index}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          );
        })
      ) : (
        <div>No Tasks. Please add one!</div>
      )}
    </div>
  );
};

export default TaskList;
