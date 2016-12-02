'use strict';

var app = express();

var express = require('express');

var nodemailer = require("nodemailer");


app.use(express.static('css'));

app.use(express.static('js'));

app.use(express.static('view'));


var smtpTransport = nodemailer.createTransport("SMTP", {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: '',
        pass: ''
    },
    tls: {rejectUnauthorized: false},

    debug: true
});




app.get('/send', function (req, res) {
  var mailOptions = {
    to: req.query.to,
	subject: req.query.subject,
	text: req.query.text };
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.end("error");
	} else {
		res.end("sent");
    }
});
});

app.get('/', function (req, res) {
	res.sendfile('index.html');
});


app.listen(3000, function () {
  console.log("Express Started on Port 3000");
});
