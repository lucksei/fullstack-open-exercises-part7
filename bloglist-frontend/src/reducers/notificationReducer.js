import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    addNotification(state, action) {
      // Despread
      const { type, message } = action.payload

      // Quick error checking
      if (type !== 'success' && type !== 'error') {
        return console.log('error setting notification type (success|error)')
      }

      // Set notification state
      const notification = { type, message }
      return notification
    },
    clearNotification() {
      return initialState
    },
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (type, message, time = 1) => {
  return (dispatch) => {
    dispatch(addNotification({ type, message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000 * time)
  }
}

export default notificationSlice.reducer