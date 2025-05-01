const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1, name: 1
  })
  response.json(blogs)
})

bloglistRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

bloglistRouter.post('/', async (request, response) => {
    const body = request.body

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

bloglistRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)
  const user = request.user
  if(!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'You do not have permission to delete this blog, only the creator can delete this blog' })
  }
  await blog.remove()
  response.status(204).end()      
})

bloglistRouter.put('/:id', async (request, response) => {
    const body = request.body

    const { likes } = body

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true, runValidators: true, context: 'query' }
  )
  if (updatedBlog) {
    response.status(200).json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = bloglistRouter