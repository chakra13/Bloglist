const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Premier blog',
        author: 'Jean Dupont',
        url: 'http://exemple.com',
        likes: 5
    },
    {
        title: 'Second blog',
        author: 'Jean Laporte',
        url: 'http://secondexemple.com',
        likes: 10
    },
    {
        title: 'Spy blog',
        author: 'Marios Leclair',
        url: 'http://spyboyblog.com',
        likes: 37
    },
    {
        title: 'Cyber blog',
        author: 'Charles Defou',
        url: 'http://cyberpunkblog.com',
        likes: 17
    },
    {
        title: 'IA blog',
        author: 'Anne Prise',
        url: 'http://blogforIA.com',
        likes: 35
    }
]

const nonExistingId = async () => {
    const blog = new Blog({title: 'willremovethissoon', author: 'willremovethissoon', url: 'willremovethissoon'})
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}
