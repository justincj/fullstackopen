// eslint-disable-next-line no-unused-vars
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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
