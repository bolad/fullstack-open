const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      }
    ]
    expect(listHelper.totalLikes(blogs)).toBe(7)
  })

  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "6a422a8554a656234d17f7",
        title: "Redux Saga rocks",
        author: "Stanley Bolad",
        url: "https://bolad.com/",
        likes: 10,
        __v: 0
      },
    ]
    expect(listHelper.totalLikes(blogs)).toBe(17);
  });

})

describe('favourite blog', () => {

  test('when list has only one blog is that blog', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      }
    ]

    expect(listHelper.favouriteBlog(blogs)).toEqual(
      {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      }
    )
  });

  test('returns null when blog list is empty', () => {
    const blogs = []

    expect(listHelper.favouriteBlog(blogs)).toEqual(null)
  });

  test('when a blog list contains multiple blogs it returns the one with hightest number of likes', () => {
   const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "6a422a8554a656234d17f7",
      title: "Redux Saga rocks",
      author: "Stanley Bolad",
      url: "https://bolad.com/",
      likes: 10,
      __v: 0
    }
   ]

   expect(listHelper.favouriteBlog(blogs)).toEqual(
     {
      title: "Redux Saga rocks",
      author: "Stanley Bolad",
      url: "https://bolad.com/",
      likes: 10
     }
   )
  })
})