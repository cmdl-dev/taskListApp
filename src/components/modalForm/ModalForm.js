import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import $ from "jquery";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

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
  const [dueDate, setDueDate] = useState(
    new Date(formInfo.dueDate || new Date())
  );
  const [startDate, setStartDate] = useState(
    new Date(formInfo.startDate || new Date())
  );
  const [formErrors, setFormErrors] = useState({ title: "", description: "" });

  useEffect(() => {
    $("#modalForm").modal("show");
    $("#modalForm").on("hidden.bs.modal", closeModal);
    return () => {
      $("#modalForm").modal("hide");
      closeModal();
    };
  }, []);
  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);
  const verifyForm = () => {
    if (title.length === 0 || description.length === 0) {
      setFormErrors({
        title: title.length === 0 ? "Please add a title" : "",
        description: description.length === 0 ? "Please add a descrption" : "",
      });
    } else {
      addTask({ title, description, priority, dueDate, startDate });
    }
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
                  className={`form-control ${
                    formErrors.title.length > 0 ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                {formErrors.title.length > 0 && (
                  <div className="invalid-feedback">{formErrors.title}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>{" "}
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.description.length > 0 ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                {formErrors.description.length > 0 && (
                  <div className="invalid-feedback">
                    {formErrors.description}
                  </div>
                )}
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

              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <br></br>
                <DatePicker
                  className="form-control"
                  id="dueDate"
                  selected={dueDate}
                  onChange={date => setDueDate(date)}
                />
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
