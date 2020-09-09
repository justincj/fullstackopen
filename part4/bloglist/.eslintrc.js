module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
<<<<<<< HEAD
  },
  extends: [
    'airbnb-base',
  ],
=======
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
>>>>>>> parent of fc9dd9c... user
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
<<<<<<< HEAD
=======
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
>>>>>>> parent of fc9dd9c... user
  },
};
