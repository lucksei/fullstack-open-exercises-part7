import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import { setNotification } from "./notificationReducer"

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    deleteUser(state, action) {
      return null
    },
  },
})

export const { setUser, deleteUser } = userSlice.actions

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    console.log(username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
    } catch (error) {
      const message =
        error.status === 401
          ? "Wrong username or password"
          : "Login Failed, try again later"
      dispatch(setNotification('error', message, 3));
      console.error(error)
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    dispatch(setUser(null));
  }
}

export default userSlice.reducer