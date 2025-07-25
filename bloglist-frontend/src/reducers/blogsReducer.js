import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer';

const sortBlogsByLikes = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes);
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      const id = action.payload.id
      return state.filter((b) => b.id === id ? false : true)
    },
    editBlog(state, action) {
      const id = action.payload.id
      return state.map((b) => b.id === id ? action.payload : b)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})


export const { addBlog, deleteBlog, editBlog, setBlogs } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(addBlog(newBlog))
      dispatch(setNotification('success', `A new blog! "${newBlog.title}"`, 3));
    } catch (error) {
      dispatch(setNotification('error', 'Could not create new blog entry', 3));
    }
  }
}

export const upvoteBlog = (blog) => {
  return async (dispatch) => {
    const upvotedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(upvotedBlog)
    dispatch(editBlog(upvotedBlog))
  }
}

export const downvoteBlog = (blog) => {
  return async (dispatch) => {
    const downvotedBlog = { ...blog, likes: blog.likes - 1 }
    await blogService.update(downvotedBlog)
    dispatch(editBlog(downvotedBlog))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(deleteBlog(blog))
  }
}

export const createComment = (blog, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.createComment(blog.id, comment)
    console.log(newComment)
    dispatch(editBlog(
      { ...blog, comments: blog.comments.concat(newComment) }
    ))
  }
}

export default blogsSlice.reducer