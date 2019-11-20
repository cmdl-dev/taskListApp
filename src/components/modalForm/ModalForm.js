import React, { useEffect, useState } from "react";
import $ from "jquery";

const ModalForm = ({ formInfo, addTask, closeModal }) => {
  const options = [
    {
      value: "LOW",
      text: "Low",
    },
    {
      value: "MED",
      text: "Medium",
    },
    {
      value: "HIGH",
      text: "High",
    },
  ];
  const [title, setTitle] = useState(formInfo.title || "");
  const [description, setDescription] = useState(formInfo.description || "");
  const [priority, setPriority] = useState(
    formInfo.priority || options[0].value
  );

  useEffect(() => {
    $("#modalForm").modal("show");
    $("#modalForm").on("hidden.bs.modal", closeModal);
    return () => {
      $("#modalForm").modal("hide");
      closeModal();
    };
  }, []);
  const verifyForm = () => {
    addTask({ title, description, priority });
  };
  return (
    <div
      className="modal fade"
      id="modalForm"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addEditModal"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addEditModal">
              Add Task
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  className="form-control"
                  id="#priority"
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                >
                  {options.map((option, index) => {
                    return (
                      <option key={index} value={option.value}>
                        {option.text}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={verifyForm}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
