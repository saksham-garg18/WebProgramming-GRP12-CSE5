// server.js
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const ejsLayouts = require('express-ejs-layouts');
const Club = require('../Server/club.model.js');
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();
const mongoose = require('mongoose');

// connect DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

// Handlebars configuration
const hbs = exphbs.create({
    extname: 'handlebars',
    layoutsDir: path.join(__dirname, '../Client/hbs'),
    partialsDir: path.join(__dirname, '../Client/hbs')
});

// Set up Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../Client/hbs'));

app.use(express.static(path.join(__dirname, '../Client/hbs')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET - Home using Handlebars
app.get('/', async (req, res) => {
    res.render('homepage.hbs'); 
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

connectDB();