// eslint-disable-next-line no-unused-vars
const R = require("ramda");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = blogs.map((blog) => blog.likes).reduce((acc, val) => acc + val);
  return sum;
};

const favouriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  return blogs.filter((blog) => blog.likes === Math.max(...likes))[0];
};

const mostLikes = (blogs) => {
  const temp = R.groupBy((blog) => blog.author, blogs);
  const authObj = (author) => {
    return {
      author,
      likes: 0,
    };
  };
  const likeAdder = (bg) => {
    const totallikes = R.sum(temp[bg["author"]].map((blog) => blog.likes));
    return R.mergeRight(bg, { likes: totallikes });
  };
  return R.compose(
    R.head,
    R.sortWith([R.descend(R.prop("likes"))]),
    R.map(likeAdder),
    R.map(authObj),
    R.keys
  )(temp);
};

const mostBlogs = (blogs) => {
  const blogbyAuthors = R.countBy((blog) => blog.author, blogs);
  const max = R.apply(Math.max, Object.values(blogbyAuthors));
  for (let [key, value] of Object.entries(blogbyAuthors)) {
    if (value === max) {
      return { author: key, blogs: max };
    }
  }
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostLikes,
  mostBlogs,
};
