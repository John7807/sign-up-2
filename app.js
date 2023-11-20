const express=require('express')
const app=express()
var bodyParser = require('body-parser')
const cookie = require("cookie-parser")
const nocache = require("nocache")

app.use(nocache())
app.use(cookie())


app.use(bodyParser.urlencoded({ extended: true }))


app.set('view engine', 'hbs')

const username="john"
const pass=1234



app.get('/',(req,res)=>{
    if(req.cookies.username&&req.cookies.password){
        res.render('home')
      }
      else{
          res.redirect("/login")
      }
      
})
app.get('/login',(req,res)=>{
   
    if(req.cookies.username&&req.cookies.password){
      res.redirect('/')
    }
    else{
        res.render("login")
    }
    
       
  
   
})

app.post('/login',(req,res)=>{
   
    const user=req.body.username
    const password=req.body.password
    
    res.cookie("password",password)
    res.cookie("username",user)
    if(user==username&&password==pass) {
        res.render('/')
    }
    else{
        res.redirect("/login")
    }
    
})
    
    



app.get('/logout',(req,res)=>{
    
    res.clearCookie("username")
    res.clearCookie("password")
    res.redirect("/")
})

app.listen(3000,()=>{
    console.log("server satrted")
})