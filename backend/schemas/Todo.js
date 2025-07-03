const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        task: {
            type: String,
            required: true,
        },
        isDone: {
            type: Boolean,
            default: false,
        },
    });
    const Todo = new mongoose.model("Todo",TodoSchema);

module.exports = Todo;