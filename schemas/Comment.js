const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }, 

  content: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  }

},{timestamps:true });

const Comment = mongoose.model('Comment', commentSchema);  
module.exports = Comment