const dummy = () => {
    return 1
  }

const totalLikes = array => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return array.reduce(reducer, 0)
  }

const favoriteBlog = array => {
  if (array.length === 0) return {}

  const reducer = (max, item) => {
    return max.likes > item.likes ? max : item
  }
  const favBlog = array.reduce(reducer)
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
}

//This function returns the author with the most blogs. If there are multiple authors with the same number of blogs, it returns the first one found.
const mostBlogs = array => {
    if (array.length === 0) return {}

    const reducer = (max, item) => {
      max[item.author] = (max[item.author] || 0) + 1
      return max
    }
    const counts = array.reduce(reducer, {})
    const maxAuthor = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)
    return { author: maxAuthor, blogs: counts[maxAuthor] }
  }

//This function returns the author with the most likes. If there are multiple authors with the same number of likes, it returns the first one found.
const mostLikes = array => {
    if (array.length === 0) return {}

    const reducer = (max, item) => {
      max[item.author] = (max[item.author] || 0) + item.likes
      return max
    }
    const counts = array.reduce(reducer, {})
    const maxAuthor = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)
    return { author: maxAuthor, likes: counts[maxAuthor] }
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
  }