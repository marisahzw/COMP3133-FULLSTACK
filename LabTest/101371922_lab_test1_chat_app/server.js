const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection string
const DB_CONNECTION_STRING = "mongodb+srv://admin:admin123@cluster0.dqrno8h.mongodb.net/chatapp?retryWrites=true&w=majority";
mongoose.connect(DB_CONNECTION_STRING)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Mongoose models for User and Message
const User = mongoose.model('User', { username: String, password: String });
const Message = mongoose.model('Message', { from_user: String, room: String, message: String, date_sent: Date });

// Express routes for authentication, room lists, etc.

// User Signup
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch Room Lists
app.get('/rooms', (req, res) => {
  try {
    // Logic to fetch room lists from database or any other source
    const rooms = ['devops', 'cloud computing', 'covid19', 'sports', 'nodeJS'];
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.redirect('/login'); // Redirecting to the login page
  });

  const path = require('path');


// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (room) => {
    socket.join(room);
  });

  socket.on('message', async (data) => {
    try {
      // Save message to MongoDB
      const message = new Message(data);
      await message.save();
      // Broadcast message to all clients in the room
      io.to(data.room).emit('message', data);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
