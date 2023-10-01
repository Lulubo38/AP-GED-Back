const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Configure CORS to accept requests only from your frontend
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

// Import routes
const usersRoutes = require('./routes/users');  // Correction du chemin ici

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Ged', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Could not connect to MongoDB:', error));

// Use routes
app.use('/api/users', usersRoutes);

// Middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
