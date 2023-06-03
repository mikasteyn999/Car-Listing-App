// Import the necessary libraries
const express = require('express'); // Express.js for building the server
const bodyParser = require('body-parser'); // Body-parser for parsing request bodies
const cors = require('cors');  // CORS to allow cross-origin requests

// Initialize the express app
const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use cors middleware to enable cross-origin requests
// Specifies the allowed methods
app.use(cors({ 
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'], 
}));

// Initialize a car list with some predefined car objects
let cars = [
  {"id": "1", "make": "Mercedes-Benz", "model": "A-class", "seats": 5}, 
  {"id": "2", "make": "Land Rover", "model": "Defender 90", "seats": 6}
];

// Define a GET route for the root URL ("/") of the API
// Sends a welcome message to the client
app.get('/', (req, res) => {
    res.send('Welcome to the Car API!');
});

// Define a GET route for "/api" URL
// Sends the list of cars to the client
app.get('/api', (req, res) => {
  res.send(cars);
});

// Define a POST route for "/api" URL
// Adds a new car to the list and sends the updated list to the client
app.post('/api', (req, res) => {
  const { id, make, model, seats } = req.body;

  if (!id || !make || !model || seats === undefined) {
    return res.status(400).send({ error: 'All fields (id, make, model, seats) are required' });
  }

  const newCar = {
    id,
    make,
    model,
    seats: Number(seats)
  };

  cars.push(newCar);
  res.send(cars);
});

// Define a DELETE route for "/api/:id" URL
// Deletes the car with the specified id from the list and sends the updated list to the client
app.delete('/api/:id', (req, res) => {
  const carId = req.params.id;
  cars = cars.filter(car => car.id !== carId);
  res.send(cars);
});

// Define a PUT route for "/api/:id" URL
// Updates the car with the specified id in the list and sends the updated list to the client
app.put('/api/:id', (req, res) => {
  const { id, make, model, seats } = req.body;

  const carIndex = cars.findIndex(car => car.id === id);

  if (carIndex === -1) {
    return res.status(404).send({ error: 'Car not found' });
  }

  cars[carIndex] = { id, make, model, seats: Number(seats) };
  res.send(cars);
});

// Start the server and listen on port 8080
app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
