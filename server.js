const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public")); // Serve static files
app.use(express.urlencoded({ extended: true })); // Process form fields

// CREATING ROUTES
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/admission", (req, res) => {
    res.render("admission");
});

app.get("/gallery", (req, res) => {
    res.render("gallery");
});

app.get("/gallery2", (req, res) => {
    res.render("gallery2");
});

app.get("/gallery3", (req, res) => {
    res.render("gallery3");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/curriculum", (req, res) => {
    res.render("curriculum");
});

app.get("/news1", (req, res) => {
    res.render("news1");
});

app.get("/news2", (req, res) => {
    res.render("news2");
});

app.get("/news3", (req, res) => {
    res.render("news3");
});

app.get("/news4", (req, res) => {
    res.render("news4");
});

// Route to handle form submission
app.post('/send_email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Load from .env
            pass: process.env.EMAIL_PASS  // Load from .env
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Use the same email for receiving
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending email.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});

app.listen(5000, () => console.log("Server started on port 5000"));
