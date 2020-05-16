
const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://bolad:${password}@cluster0-il93b.mongodb.net/blog-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model('Blog', blogSchema);

// const blog = new Blog({
//     title: "Test title",
//     author: "Stanley",
//     url: "stanley.com",
//     likes: 5
//   })
  
//   blog.save().then(() => {
//     console.log('blog saved!')
//     mongoose.connection.close()
//   })

  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })