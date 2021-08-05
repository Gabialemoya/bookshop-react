const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const stripe = require('stripe')('sk_test_51JEOqfE8MBcl0O91brSss1h1YZIq3NizVXzbFbGKpQFoxV82L31Gt6uEaUGzxjIKHWt3qeQhtCSeWoBsKkBWjgWV00zbnqYiFq');

const app = express();

// app.use(cors({
//   origin: true
// }));
// app.use(express.json());

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
// app.post('/payments/create', async (req, res) => {
//   try {
//     const { amount, shipping } = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       shipping,
//       amount,
//       currency: 'usd'
//     });

//     res
//       .status(200)
//       .send(paymentIntent.client_secret);

//   } catch (err) {
//     res
//       .status(500)
//       .json({
//         statusCode: 500,
//         message: err.message
//       });
//   }
// })

app.get('*', (req, res) => {
  res
    .status(404)
    .send('404, Not Found.');
});

exports.api = functions.https.onRequest(app);