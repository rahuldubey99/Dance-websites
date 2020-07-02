const express = require("express");
const path = require("path");
const app =express();
const port = 8080;
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
//Define mongo schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  })
  const Contact = mongoose.model('Contact', contactSchema);
//Express specific stuff

app.use('/static',express.static('static'));
app.use(express.urlencoded())

//Pug specific stuff

app.set('view engine','pug')   //set the template engine as a pug
app.set('views',path.join(__dirname,'views'))  //set the view directory 


//End point
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug');
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug')
})
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>
    {res.status(400).send("Item was not saved to the data base")})
    //res.status(200).render('contact.pug')
})

app.listen(port, ( ) =>{
      console.log(`server starte port:${port}`)
      
})