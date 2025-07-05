const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./schemas/User");
const Todo = require("./schemas/Todo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use(cors({
  origin: 'https://todo-frontend-black-three.vercel.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(express.json());


app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
   const existingUser = await User.findOne({ username:username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET);

    res.status(201).json({ message: "User created", token, user: newUser });
  } catch (err) {
  console.log("Signup Failed");
res.status(500).json({ message: "Signup Failed" });

}

});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET);

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});



app.post("/todo", async (req, res) => {
  try {
    const { userId, task } = req.body;
    console.log(req.body);
    console.log(userId);
    const todo = new Todo({ userId, task });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to save todo", details: err });
  }
});

app.get("/todo/:userId", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.delete("/todo/delete/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const deleted = await Todo.findByIdAndDelete(todoId);

    if (!deleted) return res.status(404).json({ error: "Todo not found" });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Backend delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.patch("/todos/done/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { isDone: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});


app.listen(8080, (req, res) => {
  console.log("listening on port 8080");
})
