/* 
* Author: Solomon Antoine
* Date: 6/17/2018
* Install Dependencies, run the statement from below: 
* "yarn add express cors @sendgrid/mail" 
* To run server use the statement below: 
* 'nodemon index.js'
* 
MAKE SURE YOU HAVE NODEMON Installed! 
For Reference check here: https://www.npmjs.com/package/nodemon 
*/

const dotenv = require('dotenv')

const express = require('express'); //needed to launch server
const cors = require('cors'); //needed to disable sendgrid security
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails 

const app = express(); //alias from the express function

dotenv.config();

//sendgrid api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setApiKey("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")

app.use(cors()); //utilize Cors so the browser doesn't restrict data, without it Sendgrid will not send!

// Welcome page of the express server:
app.get('/', (req, res) => {
    res.send("Welcome to the Sendgrid Emailing Server"); 
});

// app.get('/send-email', (req,res) => {
app.get('/send-email', (req,res) => {  
    
    //Get Variables from query string in the search bar
    const { recipient, sender, topic, text, send_at } = req.query; 
    const send_at_toInt = parseInt(send_at, 10)
    console.log("req.query.send_at " + typeof send_at_toInt + " " + send_at_toInt)
    console.log("req.query.send_at " + send_at)
    //Sendgrid Data Requirements
    const msg = {
        to: recipient, 
        from: sender,
        subject: topic,
        text: text,
        send_at: send_at_toInt
    }

    //Send Email
    // sgMail.send(msg)
    sgMail.send(msg)
    .then((msg) => console.log("send to: " + send_at + " " + text))
    .catch(err => console.error(err.response.body));
});


// to access server run 'nodemon index.js' then click here: http://localhost:4000/
app.listen(4000, () => console.log("Running on Port 4000")); 

