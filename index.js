//express init 
var express = require('express');
var router = express.Router();
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var validator = require("email-validator");

const { response } = require('express');
var app = express();

const url = require('url');
const reqUrl = 'http://ProjectFourNodeJS.com/';



app.use(express.static(path.join(__dirname,'public')));

const urlObject = url.parse(reqUrl, true);

app.use(express.json( {limit: '1mb'} ));

app.post('/api', (req, res) => {

    console.log(req.body);
    const info = req.body;
    console.log(info.email)
    
    validator.validate(info.email);
  
    var transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
          user: 'projectfournodejs@gmail.com',
          pass: 'NodeJS123'
        }
        
    });
        var mailOptions = {
        from: 'projectfournodejs@gmail.com',
        to: info.email,
        subject: 'An Email from Jacob Bowers using Node.js', 
        text: 'Dear ' + info.name + ' Thank you for using your feedback! - Jacob-Bowers@' + urlObject.host,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

});

// Listening for Server Port or 8080
const PORT = process.env.PORT || 8080;

//Listen for Server
app.listen(PORT, () => console.info('Listening on port ' + PORT + ':'))