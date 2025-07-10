import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      // ...
    },
    editBlog(state, action) {
      // ...
    },
    setBlogs(state, action) {
      state = action.payload
    },
  },
})


export const { } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const upvoteBlog = (blog) => {
  return async (dispatch) => {
    const votedBlog = { ...votedBlog, votes: blog.votes + 1 }
    const blog = await blogService.update(blog)
  }
}

export const downvoteBlog = (blog) => {
  return async (dispatch) => {
    // ...
  }
}

export const deleteBlog = (blog) => {
  return (dispatch) => {
    // ...
  }
}

export default blogsSlice.reducer