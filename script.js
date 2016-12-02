'use strict';


var express = require('express');

var nodemailer = require("nodemailer");

var app = express();

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

app.use(express.static('view'));

app.use(express.static('css'));

app.use(express.static('js'));

app.get('/', function (req, res) {
	res.sendfile('main.html');
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

app.listen(3000, function () {
  console.log("Express Started on Port 3000");
});
