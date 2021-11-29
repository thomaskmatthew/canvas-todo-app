import { useSelector, useDispatch } from 'react-redux';
import styles from './canvastodo.module.css';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import { 
  addTask, 
  selectTask,
  setItem,
  selectListOfTask,
  removeTask,
  editNotes,
  setCurrentList,
  setCurrentGobalList
} from './canvastodoSlice.js';
var taskItem = undefined;
const IMPORTEDTASKS =[
  {
    task: 'Stats-380 hw 9', 
    id: 66023, 
    done: false, 
    notes: "study three hours a day"
  },
  {
    task: 'Geol 101 exam 3', 
    id: 6733, 
    done: false, 
    notes: "nothing"
  },
  {
    task: 'human-comp final project', 
    id: 56022, 
    done: false, 
    notes: "think about doing it"
  }
];

export function CanvasTodo () {
  const todo = useSelector(selectTask);
  const listOfToDo = useSelector(selectListOfTask);
  const dispatch = useDispatch();
  

  const addtoList = () => {
    if(todo !== '' && todo !== undefined){
      let currentTask = {
        task: todo, 
        id: String(Date.now()), 
        done: false, 
        notes: ""
      };
      dispatch(addTask({
        todo: currentTask,
      }));
    } 
  };
  
  const textChange = (input) => {
    dispatch(setItem({
      item: input,
    }));
  };
  const removeToDo = (item) => {
    dispatch(removeTask({
      task: item,
    }));
  };
  const changeNotes = (item, note) => {
    setIsOpen(!isOpen)
    dispatch(editNotes({
      task: item,
      notes: note,
    }));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [importIsOpen, importSetIsOpen] = useState(false);
  
  const toggleComment = (item) => {
    taskItem = item
    setIsOpen(!isOpen);
  }
  
  const addGobalTasks = () => {
    dispatch(setCurrentGobalList({
      gobalList: IMPORTEDTASKS,
    }));
  };

  const toggleImport = () => {
    importSetIsOpen(!importIsOpen);
  }
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const currentTodo = reorder(
      listOfToDo,
      result.source.index,
      result.destination.index
    );
    dispatch(setCurrentList({
      currentList: currentTodo
    }));
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  function TaskComment(props) {
    return(
      <>
        <div className={styles.popupbox}>
          <div className={styles.box}>
            <span className={styles.closeicon} onClick={props.closeComment}>x</span>
            {props.content}
          </div>
        </div>
      </>
    );
  }

  function TaskImport(props) {
    return(
      <>
        <div className={styles.popupbox}>
          <div className={styles.box}>
            <span className={styles.closeicon} onClick={props.closeImport}>x</span>
            {props.content}
          </div>
        </div>
      </>
    );
  }

  return (
    <main>
      <div className={styles.spacer}>
        <label className={styles.header} >Canvas ToDo List</label><br/>
      </div>
      <div className={styles.taskbar}>
        <input  className={styles.padder} type="text" value={todo} onChange={(event) => textChange(event.target.value)}/>
        <button className={styles.button} onClick={addtoList}>  Add ToDo </button>
        <button className={styles.button} onClick={() => toggleImport()}>  Import </button> <br/>
      </div>
      <div >
        <DragDropContext onDragEnd={onDragEnd}>  
          <Droppable droppableId="droppable" >  
                  {(provided) => (  
                      <div  className={styles.taskbackground}
                          {...provided.droppableProps}  
                          ref={provided.innerRef}  
                        >  
                          {listOfToDo.map((item, index) => (  
                              <Draggable draggableId={String(index)} index={index}>  
                                  {(provided) => (  
                                    <div 
                                      ref={provided.innerRef}  
                                      {...provided.draggableProps}  
                                      {...provided.dragHandleProps}  
                                    >  
                                    {
                                    <li key={String(item.id)} className={styles.todolist}> 
                                    <ToDoTask value={item.task} 
                                    onClick={() => removeToDo(item.id)} 
                                    onPress={() => toggleComment(item)}/> </li> }
                                    </div> )}    
                              </Draggable>  
                          ))} 
                          {provided.placeholder}  
                      </div>  
                  )}  
          </Droppable>  
        </DragDropContext>
      </div>
      <div>  
        <label className={styles.totaltask}>
          Total Number of Tasks Uncompleted: {listOfToDo.filter(item => item.done === false).length}
        </label>
      </div>
      <div>
        {
          isOpen && <TaskComment content={
            <>
              <b>{taskItem.task.replace(/[\u0336]/g, '')}</b>
              <br/>
              <textarea className={styles.textboxer} id="txt" rows="4" cols="150">{taskItem.notes}</textarea>
              <br/>
              <button onClick={() => changeNotes(taskItem.id, document.getElementById("txt").value)}>Save Task Commment</button>
            </>
          }
          closeComment={toggleComment}
          />
        }
    </div>
    <div>
        {
          importIsOpen && <TaskImport content={
            <>
              <b>Canvas Login</b>
              <br/>
              <input type="text" placeholder="Canvas Username" id="username"/>
              <br/>
              <input type="password" placeholder="Password" id="password"/>
              <br/>
              <button onClick={() => addGobalTasks()}>Import Tasks</button>
            </>
          }
          closeImport={toggleImport}
          />
        }
    </div>
    </main>
  );
}

export function ToDoTask(props) { 
  return (
    <>

      <input  type="text" value={props.value}/>
      <button onClick={props.onClick}>Done</button>
      <input type="button" value="Comment" onClick={props.onPress} />
    </>
  );
}  

//how to talk to the main function if you have nested compents
// export function ListOfTask(props) {
//   return (
//     <>
//     {
//       props.listOfTodo.map(
//         (item) => <li key={item.id}> <ToDoTask value={item.task} onClick={() => removeTodo(item.id)}/> </li>)
//     }
//     </>
//   );
  
// }

{/* <div>
            <ul>
            {
              listOfToDo.map(
              (item) => 
              
              <li key={item.id}> 
              <ToDoTask value={item.task} onClick={() => removeToDo(item.id)} onPress={() => toggleComment(item)}/> </li>
            )
            }   */}
              {/* <ListOfTask  listOfTodo={listOfTodo} /> */}
            {/* </ul>      
        </div> */}