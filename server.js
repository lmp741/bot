require('dotenv').config()
const server = function(){
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT, ()=> {
    console.log('Server working http://localhost:${process.env.PORT}')
})}
module.exports = server;