const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public")); // Serve static files
app.use(express.urlencoded({ extended: true })); // Process form fields

// Routes
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

// Route to handle email form submission
app.post('/send_email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Email credentials are missing in .env file");
        return res.status(500).json({ message: 'Email configuration error.' });
    }

    // Nodemailer transporter configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER, // Gmail account email
        replyTo: email, // User email for replying
        to: process.env.EMAIL_USER, // Receiving email address
        subject: subject || "No subject provided", // Email subject
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // Email body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email.', error });
        } else {
            console.log('Email sent successfully:', info.response);
            res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
