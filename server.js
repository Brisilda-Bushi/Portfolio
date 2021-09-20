const express = require("express");
const app = express();
const nodemailer = require("nodemailer")
require("dotenv").config();

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static("src"));

app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "web.brisilda@gmail.com",
      pass: "istoselida",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "web.brisilda@gmail.com",
    to: "b.brisilda1552@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: "Message:"+ "\n" + req.body.message
  }
  
  transporter.sendMail(mailOptions, function (error, info) {
    if(error){
      console.log(error)
      res.send("error")
    }else{
      console.log("Email sent: " + info.response)
      res.send("success")
    }
  })
})
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})