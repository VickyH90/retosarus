//Requerimos los paquetes

const nodemailer = require('nodemailer');
const express = require("express");

const app = express();




//Creamos el objeto de transporte
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vikkybeauty90@gmail.com',
    pass: 'eyptiflqecvquqyf'
  }
});

const mensaje = "http://localhost:3000/getdata?search=1990-07-21"


const mailOptions = {
  from: 'vikkybeauty90@gmail.com',
  to: 'vikkybeauty90@gmail.com',
  subject: 'Reto API nodejs',
  text: mensaje
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});