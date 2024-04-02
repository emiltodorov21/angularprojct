const mongoose = require("mongoose");
const User = require('./Users')


const commentSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    comment: { type: String, required: true },
    username: { type: String, required: true },
    });
   
   const Comment = mongoose.model("Comment", commentSchema);
   
   module.exports = Comment;