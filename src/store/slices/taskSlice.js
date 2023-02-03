import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [] },
  reducers: {
    createTask (state, action) {
      state.tasks.push({
        ...action.payload,
        expired:
          new Date(action.payload.deadline) < new Date() &&
          !action.payload.isDone,
        id: uuidv4()
      })
    },
    deleteTask (state, action) {
      state.tasks = state.tasks.filter(c => c.id !== action.payload)
    },
    updateTask (state, action) {
      // payload:{id, updatedData: {isFavourite: true}}
      const index = state.tasks.findIndex(item => item.id === action.payload.id)
      console.log('index :>> ', index)
      state.tasks[index] = {
        ...state.tasks[index],
        ...action.payload.updatedData
      }

      state.tasks[index].expired =
        new Date(state.tasks[index].deadline) < new Date() &&
        !state.tasks[index].isDone
    }
  }
})

const { reducer, actions } = taskSlice

export const { createTask, deleteTask, updateTask } = actions // action creators

export default reducer
