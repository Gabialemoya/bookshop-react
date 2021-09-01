const functions = require('firebase-functions');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.post("/send-email", (req, res) => {
  try {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: "oren.labadie@ethereal.email",
            pass: "weaTKqcSpVACeWUnsM"
          },
        });

        const mailOptions = {
          from: "Remitente",
          to: "gabiota4256@gmail.com",
          subject: "Asunto nodemailer",
          text: "Holis"
        };
        transporter.sendMail(mailOptions);


        res
          .status(200);
         
    
      } catch (err) {
        res
          .status(500)
          .json({
            statusCode: 500,
            message: err.message
          });
      }


  


app.listen(3000, () => {
  console.log("Servidor en -> http://localhost:3000");
});

app.get('*', (req, res) => {
  res
    .status(404)
    .send('404, Not Found.');
});

exports.api = functions.https.onRequest(app);