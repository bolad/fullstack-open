const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((accumulatedBlogs, blog) => {
    return accumulatedBlogs + blog.likes;
  }, 0);
};

const favouriteBlog = blogs => {
  if (!blogs || blogs.length === 0) return null;
  
  const sortedBlogs = blogs
    .sort((x,y) => y.likes - x.likes)
    .map(blog => (
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
      }
    ))
    return sortedBlogs[0]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}