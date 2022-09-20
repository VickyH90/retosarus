const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { Router } = require("express");
const nodemailer = require("nodemailer");

const app = express();

const port = 3000;

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongodb connection
mongoose.connect("mongodb+srv://Vickyh90:Senavikky90@cluster0.zqvcktn.mongodb.net/?retryWrites=true&w=majority")
    .then (() => console.log('Connected to crudDb in MongoDB Atlas'))
    .catch ((error) => console.error('Cannot connect to Db,  ' + error))

const crudSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        required: true
    }
    

}, {versionKey: false});

const crud = mongoose.model("crud", crudSchema);

app.get('/index', (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});

app.post('/addData', (req, res) => {
    const myData = new crud(req.body);
    myData.save()
        .then(item => {
            res.status(201).send(myData);
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});



app.get('/getData', (req, res) => {
    const date = new Date(req.query.search)
    console.log ({req: date}) 
    crud.find({date})
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(404).json('Error: ' + err));
})

//Creamos el objeto de transporte
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vikkybeauty90@gmail.com',
      pass: 'eyptiflqecvquqyf'
    }
  });
  
  const mensaje = email
  
  
  const mailOptions = {
    from: 'vikkybeauty90@gmail.com',
    to: 'vikkybeauty90@gmail.com',
    subject: 'Reto API nodejs',
    text: mensaje
  };
  
  function email(){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
    
  }
app.listen(port, () => {
 console.log("Server listening on port " + port);
});



