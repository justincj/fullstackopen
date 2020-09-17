const User = require("../models/user");
const bcrypt = require("bcrypt");

const userRouter = require("express").Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  return res.status(200).send(users);
});

userRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!(body.password && body.password.length >= 3)) {
    return res
      .status(400)
      .json({ error: "password must have atleast 3 characters length" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const userObject = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const saveduser = await userObject.save();
  return res.status(201).send(saveduser);
});

module.exports = userRouter;
