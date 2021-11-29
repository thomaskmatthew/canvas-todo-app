import { createSlice } from "@reduxjs/toolkit";

function line(text){
  return text
  .split('')
  .map(char => char + '\u0336')
  .join('')
}



const canvastodoSlice = createSlice({
  name: 'canvasTodo',
  initialState: {
    todolist: [],
    item: '',
  },
  reducers: {
    removeTask: (canvasTodo, action) => {
      let {
        task,
      } = action.payload;
      let listTask = canvasTodo.todolist.find(t => t.id === task)
      if (listTask.done === true) {
        listTask.task = listTask.task.replace(/[\u0336]/g, '')
        listTask.done = false
        task = listTask.id
      } else {
        listTask.task = line(listTask.task)
        listTask.done = true
        task = listTask.id
      }
    },
    setCurrentGobalList: (canvasTodo, action) => {
      const {
        gobalList,
      } = action.payload
      for ( let index = 0; index < gobalList.length; index++){
        canvasTodo.todolist.push(gobalList[index]);
      }
    },
    setCurrentList: (canvasTodo, action) => {
      const {
        currentList,
      } = action.payload;
      if( currentList !== undefined){
        canvasTodo.todolist.splice(0, canvasTodo.todolist.length, ...currentList);
      }
    },
    addTask: (canvasTodo, action) => {
      const {
        todo,
      } = action.payload;
      canvasTodo.todolist.push(todo);
      canvasTodo.item = '';
    },
    setItem: (canvasTodo, action) => {
      const {
        item,
      } = action.payload
      canvasTodo.item = item;
    },
    editNotes: (canvasTodo, action) => {
      let {
        task,
        notes,
      } = action.payload
      let listTask = canvasTodo.todolist.find(t => t.id === task)
      listTask.notes = notes
      task = listTask.id
    },
  },
});

export function selectTask(state) {
  return state.canvasTodo.item;
}
export function selectListOfTask(state) {
  return state.canvasTodo.todolist;
}
export const {
  addTask,
  setItem,
  removeTask,
  editNotes,
  setCurrentList,
  setCurrentGobalList,
} = canvastodoSlice.actions;

export default canvastodoSlice;