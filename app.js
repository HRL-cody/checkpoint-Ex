const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const { verify } = require('crypto');
//initialazation
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // for parsing application/json
//load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Tests
app.use(verifDate = (req, res, next) => {
    const date = new Date();
    const day = date.toDateString().substring(0, 3);
    const hour = date.toTimeString().substring(0, 2);
    let time = false;
    switch (day) {
        case 'Mon':
        case 'Tue':
        case 'Thu':
        case 'Wed':
        case 'Fri': time = true
    }
    if (time === true && hour >= 17 && hour <= 22) {
        next();
    }
    else res.send("The website is closed !")
})
//home router
app.get('/', (req, res) => {
    res.render('Login')
})
app.get('/Home' , (req , res) =>{
    res.render('Home')
})
app.get('/Contact' , (req , res) =>{
    res.render('Contact')
})

app.get('/services' , (req , res) =>{
    res.render('services')
})
//post
app.post('/' , (req , res)=>{
    if(req.body.username === "hamouda" && req.body.password === 'Mdemagh')
    res.render('Home' , {username: req.body.username})
    else
    res.send("you have to Register");
})

//server
const port = 5000;
app.listen(port , (err) =>{
    if (err) console.log("connection Failed")
    else console.log(`server is connected ${port}`)
})