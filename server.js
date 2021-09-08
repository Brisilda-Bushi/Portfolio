const express = require("express");
const app = express();
const nodemailer = require("nodemailer")

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
    host: "mail.coding-school.org",
    port: 465,
    auth: {
      user: "fbw46-2@coding-school.org",
      pass: "fbw46-2",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "fbw46-2@coding-school.org",
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