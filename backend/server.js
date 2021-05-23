const express = require('express');
const app = express();
const nodemailer = require("nodemailer")

const PORT = process.env.PORT || 5000;


//Middleware 

app.use(express.static('frontend'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'' // Email here,
            pass: '' //password for email here should be created in env file//
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: "" // re-enter email here,
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        } else{
            console.log('Email sent: ' + info.response);
            res.send('succes');
        }

    })
})

app.listen(PORT, () => {
    console.log(`Server now listening to port ${PORT}`)
})