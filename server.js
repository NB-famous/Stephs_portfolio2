const express = require('express');
const app = express();
const nodemailer = require("nodemailer")

const PORT = process.env.PORT || 5000;



require('dotenv').config();


//Middleware 

// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/frontEnd/build/index.html')))


app.use(express.static('frontend'))
app.use(express.json())



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html')
    res.sendFile(__dirname + '/frontend/sitemap.xml')
    res.sendFile(__dirname + '/frontend/main.js')
    res.sendFile(__dirname + '/frontend/style.css')
})

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.EMAIL, // Email here,
            pass: process.env.PASS //password for email here should be created in env file//
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL, // re-enter email here,
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