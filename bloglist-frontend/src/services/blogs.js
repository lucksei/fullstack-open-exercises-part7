import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  // Modify the blog so that the user field has only its id as a string
  const blogRequest = { ...blog, user: blog.user.id }

  // Modify the blog so that the comments field has only their ids as strings
  blogRequest.comments = blog.comments.map(comment => comment.id)

  await axios.patch(`${baseUrl}/${blogRequest.id}`, blogRequest, config)
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blogId}`, config)
}

const createComment = async (blogId, newComment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, newComment)
  return response.data
}

export default { getAll, setToken, create, update, remove, createComment }