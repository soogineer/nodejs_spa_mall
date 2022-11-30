const express = require('express');
const app = express();
require('dotenv').config(); //env를 사용한다는 뜻, proces.env.PORT/URL 전에 선언해줘야함(순서대로 작동하기 때문)
const port = process.env.PORT;
const db_url = process.env.URL; 
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const router = require('./routes');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended : true }));

app.use('/api', router)

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


 mongoose.connect(db_url)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err))

  module.exports = router;  