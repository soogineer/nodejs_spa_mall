const express = require("express");
const { exists } = require("../schemas/comment");
const router = express.Router();
const Comment = require("../schemas/comment");
const { collection } = require("../schemas/post");
// const Post = require("../schemas/Post"); 


// 댓글 생성 API 
router.post("/:_postId", async (req, res) => {
    console.log (req.body)
    const postId = req.params._postId;
  
    if (req.body.user === undefined || req.body.content === undefined) {
      return res.status(400).json({ message:'댓글 내용을 입력해주세요.'})
    }
      await Comment.create({ user : req.body.user, password : req.body.password, content : req.body.content, postId: postId});
      return res.json({ message : '댓글을 생성하였습니다.'});
    }); 



// 댓글 목록 조회 API
router.get("/:_postId", async (req, res) => {
const postId = req.params._postId;  
const comments= await Comment.find({ postId })
const { user, password, content } = req.body;
    console.log(req.body.title);
    
if (postId !== comments.postId){
    console.log(comments.length)
    return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'})
  }
const result = comments.map((comment) => {
    return {
    commentId : comment._id,
    user: comment.user,
    content: comment.content,
    createdAt : comment.createdAt
    }
})
res.json({
    data : result
})
});

// 댓글 수정 API
router.put("/:_commentId", async(req, res) => {
    try {
      const commentId = req.params._commentId;
    console.log(commentId);
    console.log(req.body)

    const { user, password, content } = req.body;
    console.log(req.body.user);
    
    const existsComment = await Comment.findOne({ _id : commentId });
    console.log(existsComment)

    if (req.body.content === undefined) {
            return res.status(400).json({ message:'댓글 내용을 입력해주세요.'})
        }

    if (existsComment.length === 0) {
      return res.status(404).json({message: '댓글 조회에 실패하였습니다.' })
    } 
    if (existsComment.password !== req.body.password) {
        return res.status(404).json({ message : '비밀번호가 일치하지 않습니다.' });
    }
    if (existsComment.password === req.body.password) { 
      await Comment.updateOne(
        { _id : commentId },  
        { $set: { user: user, content: content } });
        return res.status(200).json({ message : '댓글을 수정하였습니다.' });
    }
}
  catch (err) {
    console.error(err)
  return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'}) 
     
  }
  });  

// 댓글 삭제 API
router.delete("/:_commentId", async(req, res) => {
    try {const commentId = req.params._commentId;

    const existsComment = await Comment.findOne({ _id : commentId });
    if (req.body.password === undefined) { 
        console.log(req.body.length, req.body.commentId)
        return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'}) //postId가 정상인지 아닌지, body값이 들어왔는지 확인여부
        } 
    if (existsComment.password !== req.body.password) {
        return res.status(404).json({ message : '비밀번호가 일치하지 않습니다.' });
    }
    
    if (existsComment === null) {
        console.log(existsComment)
      return res.status(404).json({message: '댓글 조회에 실패하였습니다.' })
    } 

    

  if (existsComment.password === req.body.password) {
    await Comment.deleteOne({ _id : commentId });
  return res.json({ message: "댓글을 삭제하였습니다." });
  }
  }
 catch 
     (err) {
        return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'})
 }
});
  



   
module.exports = router;  // router를 사용한다는 의미