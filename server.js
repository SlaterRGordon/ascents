const express = require('express');
const mongoose = require('mongoose');

const climbs = require('./routes/api/climbs');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// Use Routes
app.use('/api/climbs', climbs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));