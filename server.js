const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 🔐 Email Transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourfirmemail@gmail.com',
    pass: 'yourpassword'
  }
});

// 📩 Contact Form Endpoint
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields required.');
  }

  const mailOptions = {
    from: email,
    to: 'okotholuochass92@gmail.com',
    subject: `New Inquiry from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Email failed.');
    }
    res.status(200).send('Message sent successfully.');
  });
});

// 🚀 Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
