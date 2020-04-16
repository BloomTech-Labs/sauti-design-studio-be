var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config');
require("dotenv").config()

var transport = {
    host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  let name = req.body.name
  let email = req.body.email
  let organization = req.body.organization
  let title = req.body.title
  let implementationCountry = req.body.implementationCountry
  let user_id = req.body.user_id
  let project_id = req.body.project_id
  let comments = req.body.comments
  let callback = req.body.callback

  let contentForSauti = `name: ${name} \n email: ${email} \n organization: ${organization} \n title: ${title} \n implementation Country: ${implementationCountry} \n user_id: ${user_id} \n project_id: ${project_id} \n comments: ${comments} \n callback: ${callback} \n`

  let contentForUser = `name: ${name} \n email: ${email} \n organization: ${organization} \n title: ${title} \n implementation Country: ${implementationCountry} \n user_id: ${user_id} \n project_id: ${project_id} \n comments: ${comments} \n `

  let mail = {
    from: name,
    to: process.env.EMAIL_USERNAME,  // Change to email address that you want to receive messages on
    subject: `New workflow from ${name}, user id: ${user_id}`,
    text: contentForSauti
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })

  transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Submission was successful",
    text: `Thank you for contacting us!\n\nForm details \n Content: ${contentForUser}\n`
  }, function(error, info){
    if(error) {
      console.log(error);
    } else{
      console.log('Message sent: ' + info.response);
    }
  });
})

router.post('/contact', (req,res,next) => {
  let email = req.body.email
  let comments = req.body.comments
  let content = `email: ${email} \n comments: ${comments} \n`

  let mail = {
    from: email,
    to: process.env.EMAIL_USERNAME,  // Change to email address that you want to receive messages on
    subject: `New Comment from ${email}`,
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })

  transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Submission was successful",
    text: `Thank you for contacting us!\n\nForm details \n Content: ${content}\n`
  }, function(error, info){
    if(error) {
      console.log(error);
    } else{
      console.log('Message sent: ' + info.response);
    }
  });
})

module.exports = router;