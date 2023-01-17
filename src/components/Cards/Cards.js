import { Trash } from "feather-icons-react/build/IconComponents";
import Clock from "feather-icons-react/build/IconComponents/Clock";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Cards.css";

function Cards(props) {
  return (
    <Draggable draggableId={props.data.id.toString()} index={props.index}>
      {(provided) => {
        return (
          <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <div className="card_top">
              <Trash
                onClick={() => {
                  props.deleteTask(props.data.id);
                }}
              />
            </div>
            <div className="card_title">
              <span>{props.data.task}</span>
            </div>
            <div className="card_footer">
              <p>
                <Clock />
                {props.data.date}
              </p>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Cards;
