import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Addbutton from "../AddButton/Addbutton";
import Cards from "../Cards/Cards";
import "./Boards.css";

function Boards() {
  const [kanbanData, setKanbanData] = useState([]);

  const getData = async () => {
    const data = await axios.get(
      "https://63c1880b71656267187dbb33.mockapi.io/tasks"
    );
    setKanbanData(data.data);
  };

  const Delete = async (id) => {
    const updatedData = kanbanData.filter((e) => e.id !== id);
    axios.delete(`https://63c1880b71656267187dbb33.mockapi.io/tasks/${id}`);
    setKanbanData(updatedData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onDrag = (result)=>{
    if(!result.destination)
      return;

    if(result.destination.droppableId === result.source.droppableId)
      return;

    if(result.destination.droppableId === 'progress' && result.source.droppableId === 'todo')
    {
      const findIndex = kanbanData.findIndex((item)=>parseInt(item.id) === parseInt(result.draggableId));
      const data = kanbanData[findIndex];
      const newData = {
        id: data.id,
        task: data.task,
        type: 'progress',
        date: data.date
      }
      kanbanData.splice(findIndex,1,newData);
      setKanbanData(kanbanData);
      axios.put(`https://63c1880b71656267187dbb33.mockapi.io/tasks/${data.id}`,newData);
    }


    if(result.destination.droppableId === 'todo' && result.source.droppableId === 'progress')
    {
      const findIndex = kanbanData.findIndex((item)=>parseInt(item.id) === parseInt(result.draggableId));
      const data = kanbanData[findIndex];
      const newData = {
        id: data.id,
        task: data.task,
        type: 'todo',
        date: data.date
      }
      kanbanData.splice(findIndex,1,newData);
      setKanbanData(kanbanData);
      axios.put(`https://63c1880b71656267187dbb33.mockapi.io/tasks/${data.id}`,newData);
    }

    if(result.destination.droppableId === 'finished' && result.source.droppableId === 'progress')
    {
      const findIndex = kanbanData.findIndex((item)=>parseInt(item.id) === parseInt(result.draggableId));
      const data = kanbanData[findIndex];
      const newData = {
        id: data.id,
        task: data.task,
        type: 'finished',
        date: data.date
      }
      kanbanData.splice(findIndex,1,newData);
      setKanbanData(kanbanData);
      axios.put(`https://63c1880b71656267187dbb33.mockapi.io/tasks/${data.id}`,newData);
    }
    
    if(result.destination.droppableId === 'progress' && result.source.droppableId === 'finished')
    {
      const findIndex = kanbanData.findIndex((item)=>parseInt(item.id) === parseInt(result.draggableId));
      const data = kanbanData[findIndex];
      const newData = {
        id: data.id,
        task: data.task,
        type: 'progress',
        date: data.date
      }
      kanbanData.splice(findIndex,1,newData);
      setKanbanData(kanbanData);
      axios.put(`https://63c1880b71656267187dbb33.mockapi.io/tasks/${data.id}`,newData);
    }
  }

  return (
    <DragDropContext onDragEnd={onDrag}>
      <div className="boards">
        <Droppable droppableId="users">
          {(provided) => {
            return (
              <div
                className="boards_users custom_scroll"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>Users</h3>
                <hr />
                <p>Kunal</p>
                {provided.placeholder}
              </div>    
            );
          }}
        </Droppable>
        <Droppable droppableId="todo">
          {(provided) => {
            return (
              <div
                className="boards_todo custom_scroll"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>To do</h3>
                <hr />
                {kanbanData.filter(item=>item.type === 'todo').map((e,index) => {
                  return <Cards key={e.id} index={index} data={e} deleteTask={Delete} />;
                })}
                <Addbutton allData={kanbanData} updateAllData={setKanbanData}/>
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Droppable droppableId="progress">
          {(provided) => {
            return (
              <div
                className="boards_progress custom_scroll"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>In progress</h3>
                <hr />
                {
                  kanbanData.filter(item=>item.type === 'progress').map((e,index)=>{
                    return <Cards key={e.id} index={index} data={e} deleteTask={Delete} />;
                  })
                }
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Droppable droppableId="finished">
          {(provided) => {
            return (
              <div
                className="boards_finished custom_scroll"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>Finished</h3>
                <hr />
                {
                  kanbanData.filter(item=>item.type === 'finished').map((e,index)=>{
                    return <Cards key={e.id} index={index} data={e} deleteTask={Delete} />;
                  })
                }
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default Boards;
