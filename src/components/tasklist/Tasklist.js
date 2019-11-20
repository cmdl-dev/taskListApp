import React from "react";
import Task from "../task/task";

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
        <h3 className="text-center">No Tasks</h3>
      )}
    </div>
  );
};

export default TaskList;
