const express = require("express");
const { exists } = require("../schemas/post");
const router = express.Router();
const Post = require("../schemas/post");

// 게시글 작성 API
router.post("/", async (req, res) => {
  console.log (req.body.user)

  if (req.body.user === undefined || req.body.password === undefined) {
    return res.status(400).json({ message:'데이터 형식이 올바르지 않습니다.'})
  }

    await Post.create({title : req.body.title, content: req.body.content, password: req.body.password, user: req.body.user});
    res.json({message : '성공'});

  });

// 게시글 조회 API
router.get("/", async(req, res) => {

const posts= await Post.find()

const result = posts.map((post) => {
  return {
    postId : post._id,
    user: post.user,
    title: post.title,
    createdAt : post.createdAt
  }
 })

res.json({
  data : result
})

});

// 게시물 상세조회 API
router.get("/:_postId", async (req, res) => {
  const {_postId} = req.params

  const posts = await Post.find({_id: _postId})
  
  if (posts.length === 0){
    return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'})
  }

  const result = posts.map((post) => {
    return {
      postId : post._id,
      user: post.user,
      title: post.title,
      createdAt : post.createdAt,
      content : post.content
    }
   })
   res.json({
    data : result
     })
  });


// 게시글 수정 API
  router.put("/:_postId", async(req, res) => {
    try {
      const postId = req.params._postId;
    console.log(postId);
    console.log(req.body)

    
    const { title, password, content } = req.body;
    console.log(req.body.title);
    
    const existsPost = await Post.find({ _id : postId });
    console.log(existsPost)
    if (existsPost.length === 0) {
      return res.status(404).json({message: '게시글 조회에 실패하였습니다.' })
    } 

    // if (req.body.title === undefined && req.body.content === undefined ) { // 0이나 null은 왜 안될까요?
    //   console.log(req.body)
    
    if (existsPost.password === req.body.password) { 
      await Post.updateOne(
        { _id : postId },  
        { $set: { title: title, content: content } });
        return res.status(200).json({ message : '게시글을 수정하였습니다.' });
    }
    
    if (existsPost.password === undefined || existsPost.password !== req.body.password) {
      return res.status(400).json({ message : '데이터 형식이 올바르지 않습니다.'})
    }
    }
  catch (err) {
  return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'}) //postId가 정상인지 아닌지, body값이 들어왔는지 확인여부
     
  }
  });  

// 게시글 삭제 API
  router.delete("/:_postId", async(req, res) => {
    const postId = req.params._postId;

    const existsPost = await Post.findOne({ _id : postId });
    if (existsPost === null) {
      return res.status(404).json({message: '게시글 조회에 실패하였습니다.' })
    } 

    if (req.body.password === undefined) { // 0이나 null은 왜 안될까요?
      console.log(req.body.length, req.body.password)
      return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'}) //postId가 정상인지 아닌지, body값이 들어왔는지 확인여부
    } 

  if (existsPost.password === req.body.password) {
    await Post.deleteOne({ _id : postId });
  return res.json({ message: "게시글을 삭제하였습니다." });
  }
  
});
  
module.exports = router;  