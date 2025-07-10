import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from '../reducers/notificationReducer'
import blogsSlice from '../reducers/blogsReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsSlice,
    }
})

console.log(store.getState());

export default store