const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const findExsitsUser = await User.findOne({ email });
    if (findExsitsUser) {
      return res.status(400).json({ error: "User Alredy exsits" });
    }

    // password convert into hasedpassword
    const hasedPassword = await bcrypt.hash(password, 10);

    // Create a new user

    const newUser = new User({ email, username, password: hasedPassword });

    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.log(`error from userRegister: ${error}`);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const compareingPassword = await bcrypt.compare(password, user.password);
    if (!user || !compareingPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // createing token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
    res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(`erroe from login user: ${error}`);
  }
};

module.exports = { userRegister, userLogin };
