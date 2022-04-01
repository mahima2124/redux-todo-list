import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, editItem } from "./todoSlice";

function Todo() {
  const [inputData, setInputData] = useState("");
  const { items, isEditItems } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [error,setError]=useState("")
  const [isEditItem, setIsEditItem] = useState("");

  const handleAddItem = () => {

    if (!inputData) {
      setError("! Please Fill The Data");
    } else if (isEditItem) {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      const index = items.findIndex((val) => val.id === isEditItem);
      let obj = {
        id: index,
        data: allInputData,
      };
      dispatch(editItem(obj));
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      dispatch(addItem(allInputData));
    }
    setInputData("");
    setIsEditItem("");
  };

  const handleEditItem = (id) => {
    let newEditItems = items.find((elem) => {
      return elem.id === id;
    });
    setInputData(newEditItems.name);
    setIsEditItem(id);
  };
  return (
    <div className="app-background">
      <p className="heading-text">TODO LIST</p>
      <div className="task-container column">
        <div className="row">
          <input
            className="text-input"
            placeholder="Enter task"
            value={inputData}
            onChange={(e) => {setInputData(e.target.value); setError('')}}
            
          />

          {!isEditItem ? (
            <i
              className="fa fa-plus add-btn"
              title="Add Item"
              onClick={() => handleAddItem()}
            ></i>
          ) : (
            
            <i
              className="fa fa-edit add-btn"
              title="Update Item"
              onClick={handleAddItem}
            ></i>
          )}
          {error &&<div className="error">{error}</div>}
        </div>
        
        <table className="showItems">
        <tr>
                  <th>Sr No.</th>
                  <th>Tasks</th>
                  <th>Actions</th>
                </tr>
          {items.map((elem,index) => {
            return (    
                <tr>
                  <td>{index+1}</td>
                  <td><h3>{elem.name}</h3></td>
                  <td>
                    <div className="todo-btn">
                      <i
                        className="fa fa-edit add-btn"
                        title="Edit Item"
                        onClick={() => handleEditItem(elem.id)}
                      ></i>
                      <i
                        className="fa fa-trash-alt delete-btn"
                        title="Delete Item"
                        onClick={() => dispatch(deleteItem(elem.id))}
                      ></i>
                    </div>
                  </td>
                </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Todo;
