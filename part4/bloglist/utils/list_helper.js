// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = blogs
    .map((blog) => blog.likes)
    .reduce((acc, val) => acc + val, 0);
  return totalLikes;
};

const favouriteBlog = (blogs) => {
  const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes);
  return sortedByLikes[0];
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
