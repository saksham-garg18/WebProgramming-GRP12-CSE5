// server.js
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Club = require('../Server/club.model.js');
const app = express();
const PORT = process.env.PORT || 3000;
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
    layoutsDir: path.join(__dirname, 'Server/layouts'),
    partialsDir: path.join(__dirname, 'Server/partials')
});

// Set up Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'Client/pages'));

// Configure EJS
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Client/pages'));

// Middleware
app.use(express.static(path.join(__dirname, 'Client')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET - Home
app.get('/', (req, res) => {
    res.render('home');
});

// GET - Clubs
app.get('/clubs', async (req, res) => {
    const clubs = await Club.find({});
    res.render(('clublisting/clublisting.ejs'));
});

// GET - Club Details
app.get('/clubs/:id', async (req, res) => {
    console.log('Received request to fetch club with ID:', req.params.id);

    try {
        const club = await Club.findById(req.params.id)

        if (!club) {
            console.error('Club not found for ID:', req.params.id);
            return res.status(404).json({ message: 'Club not found' });
        }

        console.log('Fetched club data:', JSON.stringify(club, null, 2));

        res.status(200).json(club);
    } catch (error) {
        console.error('Error fetching club data:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST - Create club
app.post('/create-club', async (req, res) => {
    console.log('Received request:', req.body);

    const newClub = new Club({
        ...req.body,
    });

    try {
        const createdClub = await newClub.save();
        res.status(201).json(createdClub);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Edit club
app.post('/clubs/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.body);

    // Find the existing club
    const club = await Club.findById(id);
    if (!club) {
        return res.status(404).json({ message: 'Club not found' });
    }

    const updatedData = {
        ...req.body,
    };

    const updatedClub = await Club.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    res.json(updatedClub);
});

// DELETE - Delete club
app.delete('/clubs/:id', async (req, res) => {
    const club = await Club.findByIdAndDelete(req.params.id);

    if (!club) {
        return res.status(404).json({ message: 'Club not found' });
    }

    res.json({ message: 'Club deleted successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

connectDB();