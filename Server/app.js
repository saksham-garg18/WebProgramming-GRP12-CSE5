// server.js
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const ejsLayouts = require('express-ejs-layouts');
const Club = require('./models/club.model.js');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Client/pages'));

app.use(express.static(path.join(__dirname, '../Client/pages')));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get - Login
app.get('/login', (req, res) => {
    res.render('onboarding/login/login.ejs', { layout: 'boilerplate' });
});

// Get - Signup
app.get('/signup', (req, res) => {
    res.render('onboarding/signup/signup.ejs', { layout: 'boilerplate' });
});

// GET - Clubs
app.get('/clubs', async (req, res) => {
    const clubs = await Club.find({});
    res.render('clublisting/clublisting.ejs', { layout: 'boilerplate' });  
});

// GET - Club Details
app.get('/clubs/:uid', async (req, res) => {
    // console.log('Received request to fetch club with ID:', req.params.uid);
    
    try {
        const club = await Club.findOne({ uid: req.params.uid });
        
        if (!club) {
            console.error('Club not found for ID:', req.params.uid);
            return res.status(404).json({ message: 'Club not found' });
        }
        
        // console.log('Fetched club data:', JSON.stringify(club, null, 2));
        
        res.render('clubdetails/clubdetails.ejs', { layout: 'boilerplate', club });
        // res.send(club);
    } catch (error) {
        console.error('Error fetching club data:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get('/club/:uid', async (req, res) => {
    // console.log('Received request to fetch club with ID:', req.params.uid);
    
    try {
        const club = await Club.findOne({ uid: req.params.uid });
        
        if (!club) {
            console.error('Club not found for ID:', req.params.uid);
            return res.status(404).json({ message: 'Club not found' });
        }
        
        // console.log('Fetched club data:', JSON.stringify(club, null, 2));
        
        res.send(club);
    } catch (error) {
        console.error('Error fetching club data:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// EDIT - Club Details
app.get('/edit-club/:uid', async (req, res) => {
    console.log('Received request to fetch club with ID:', req.params.uid);
    
    try {
        const club = await Club.findOne({ uid: req.params.uid });

        if (!club) {
            console.error('Club not found for ID:', req.params.uid);
            return res.status(404).json({ message: 'Club not found' });
        }

        console.log('Fetched club data:', JSON.stringify(club, null, 2));

        res.render('editclub/editclub.ejs', { layout: 'boilerplate', club });
    } catch (error) {
        console.error('Error fetching club data:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET - Club Details
app.get('/create-club', async (req, res) => {
        res.render('newclub/newclub.ejs', { layout: 'boilerplate'});
    }
);

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
app.post('/clubs/:uid', async (req, res) => {
    const { uid } = req.params;
    console.log(req.body);

    // Find the existing club
    const club = await Club.findOne({uid: uid});
    if (!club) {
        return res.status(404).json({ message: 'Club not found' });
    }

    const updatedData = {
        ...req.body,
    };

    const updatedClub = await Club.findOneAndUpdate({ uid }, updatedData, { new: true, runValidators: true });

    res.json(updatedClub);
});

// DELETE - Delete club
app.delete('/clubs/:uid', async (req, res) => {
    console.log("Received request to delete club with ID:", req.params.uid);
    await Club.deleteOne({uid: req.params.uid});
    res.redirect('/clubs');
    console.log("Club deleted successfully");
});

app.post('/bhtsaare', async (req, res) => {
    // console.log('Received request:', req.body);

    const clubsData = req.body; // Assuming clubs are passed as an array in req.body.clubs

    if (!Array.isArray(clubsData) || clubsData.length === 0) {
        return res.status(400).json({ message: 'No clubs provided.' });
    }

    const newClubs = clubsData.map(club => new Club({ ...club }));

    try {
        const createdClubs = await Club.insertMany(newClubs); // Use insertMany for bulk insert
        res.status(201).json(createdClubs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

connectDB();