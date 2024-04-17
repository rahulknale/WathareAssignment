const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// CORS middleware to allow requests from any origin
app.use(cors());

app.use(express.json());

// Body parser middleware to handle JSON data in request body
app.use(bodyParser.json());

// Connect to MongoDB without username and password
const uri = 'mongodb://localhost:27017/demo';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose connection
const db = mongoose.connection;

// Handle connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the Express server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define your schema and models here if needed

// Define your Mongoose schema for sensor data (replace with your schema)
const SensorDataSchema = new mongoose.Schema({
  ts: { type: Date, required: true },
  machine_status: { type: String, required: true },
  vibration: { type: Number, required: true },
});

// Create the Mongoose model for sensor data
const SensorData = mongoose.model('newCollection', SensorDataSchema);

//-----------------------------------------------------------------------------
// GET /api/data endpoint to retrieve sensor data from MongoDB
app.get('/api/data', async (req, res) => {
  try {
    const sensorData = await SensorData.find();
    res.json(sensorData);
  } catch (err) {
    console.error('Error fetching sensor data:', err);
    res.status(500).json({ message: 'Error retrieving sensor data' });
  }
});
//-----------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
