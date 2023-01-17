import axios from "axios";
import { X } from "feather-icons-react/build/IconComponents";
import React, { useState } from "react";
import "./Addbutton.css";

function Addbutton(props) {
  const [addBtn, setAddBtn] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const addTask = async () => {
    const date = new Date();
    let d = date.toDateString();
    let lastId;
    if (props.allData.slice(-1)[0] === undefined) lastId = 0;
    else lastId = parseInt(props.allData.slice(-1)[0].id);
    const newTask = {
      id: lastId + 1,
      task: inputValue,
      type: "todo",
      date: d,
    };
    const updatedData = [...props.allData, newTask];
    axios.post("https://63c1880b71656267187dbb33.mockapi.io/tasks", newTask);
    props.updateAllData(updatedData);
    setAddBtn(false);
    setInputValue("");
  };

  return (
    <>
      {addBtn ? (
        <div className="add_button_header">
          <input
            type="text"
            placeholder="Enter task"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <div className="add_button_header_inner">
            <button className="input_btn" onClick={addTask}>
              Add
            </button>
            <X onClick={() => {
              setAddBtn(false);
            }}/>
          </div>
        </div>
      ) : (
        <div className="add_button">
          <button
            onClick={() => {
              setAddBtn(true);
            }}
          >
            {" "}
            + Add new task
          </button>
        </div>
      )}
    </>
  );
}

export default Addbutton;
