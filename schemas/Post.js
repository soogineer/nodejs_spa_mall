const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required : true,
  },
  user: {
    type: String,
    required : true,
  }, 
  password: {
    type: String,
    required : true,
  },
  content: {
    type: String,
    required : true,
  }

},{timestamps:true });

const Post = mongoose.model('Post', postSchema);  
module.exports = Post