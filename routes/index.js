const express = require("express")
const router = require("express").Router()

const postsRouter = require("./posts") //post로 가라
const commentsRouter = require("./comments") //comment로 가라

router.use("/posts", postsRouter)
router.use("/comments", commentsRouter)


module.exports = router;  