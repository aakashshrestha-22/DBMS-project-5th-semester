const express = require('express')
const mysql = require('mysql');
require('dotenv').config();
const path= require('path');
const bodyparser=require('body-parser')


const app = express();
const port = process.env.PORT || 5000;
const exphbs = require('express-handlebars')
//parsing middleware
app.use(express.urlencoded({ extended: false }))
//parse applicatimn
app.use(express.json())



//templating
const handlebars = exphbs.create({extname:'.hbs'})
app.engine('.hbs',handlebars.engine);
app.set('view engine','.hbs')
app.set('home','./public/home')
app.set('views','./views')

//static folder
app.use(bodyparser.urlencoded({extended:false}))
// console.log(path.dirname("__dirname"))
app.use(express.static(path.join(__dirname,"public")));
//homepage
// app.get(req,res)=>{
//   res.render('homepage')
// }

// connection pool

const pool= mysql.createPool({
  connectionLimit:100,
  host           : process.env.DB_HOST,
  user           :process.env.DB_USER,
  password       :process.env.DB_PASS,
  database       : process.env.DB_NAME
  
})
// //connect to DB
pool.getConnection((err,connection)=>{
  if(err){
    throw err
    //symphony is wrong and not connected 
  }
  console.log('connected as ID'+connection.threadId) 
})

 const routes = require('./server/routes/user')
  app.use('',routes)


app.listen(port, () => console.log(`Listening on port ${port}`));