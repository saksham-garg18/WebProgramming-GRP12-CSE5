// server.js
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
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
    layoutsDir: path.join(__dirname, '../Client/hbs'),  // Correct path for layouts
    partialsDir: path.join(__dirname, '../Client/hbs'), // Correct path for partials
});

// Set up Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../Client/hbs')); // Correct path for views

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Client/hbs')));  // Serve static files from the Client directory

// Data to inject into the template
const testimonialsData = {
    testimonials: [
      {
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae, temporibus et magnam, atque saepe dignissimos architecto iusto tempore, cumque deleniti rem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae.",
        name: "Adnan Hussain",
        position: "Boss",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTToPUxWqXxLg6d1Kpj2QNQjtfMxTzsxhC8dg&s",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae, temporibus et magnam, atque saepe dignissimos architecto iusto tempore, cumque deleniti rem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae.",
        name: "Sarah Khan",
        position: "Manager",
        image:
          "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae, temporibus et magnam, atque saepe dignissimos architecto iusto tempore, cumque deleniti rem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi adipisci hic pariatur vitae.",
        name: "John Doe",
        position: "Developer",
        image:
          "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
      },
    ],
  };

const imageData = {
    imageStack: [
        "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1497911270199-1c552ee64aa4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1522776302589-df9907421c44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    horizonImages: [
        "https://plus.unsplash.com/premium_photo-1663954130790-e85da8e5539c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2t8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1661956197580-008967ad1500?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmFsbGV5fGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1701094772103-c60b22a69ccc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXVyYXxlbnwwfHwwfHx8MA%3D%3D",
    ],
};

// GET - Home using Handlebars
app.get('/', async (req, res) => {
    res.render('homepage.hbs', {
        testimonials: testimonialsData.testimonials, 
        imageStack: imageData.imageStack, 
        horizonImages: imageData.horizonImages 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

connectDB();
