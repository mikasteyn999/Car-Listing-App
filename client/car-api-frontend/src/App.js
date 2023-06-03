// Importing necessary modules from react and CSS file
import React, { Component } from 'react';
import './App.css';

// Main App Component
class App extends Component {
  // Initial state of the component
  state = {
    cars: [], // Cars list
    id: '', // Car id
    make: '', // Car make
    model: '', // Car model
    seats: '', // Car seats
    isUpdating: false // Check if updating or not
  };

  // Lifecycle method that runs after component has been mounted
  componentDidMount() {
    // Fetch initial list of cars from API
    fetch('http://localhost:8080/api')
      .then(response => response.json())
      .then(data => this.setState({ cars: data }));
  }

  // Method to handle changes in form inputs
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Method to clear the form
  clearForm = () => {
    this.setState({ id: '', make: '', model: '', seats: '', isUpdating: false });
  }

  // Method to handle form submission
  handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    const { id, make, model, seats, isUpdating } = this.state; // Destructure state
    let carData = { id, make, model, seats: Number(seats) }; // Construct carData

    // Check if in updating mode or not, call the appropriate method
    if (isUpdating) {
      await this.handleUpdate(carData);
    } else {
      carData.id = Date.now().toString();
      await this.handleAdd(carData);
    }
  }


  // Method to add a car
  handleAdd = async (carData) => {
    // Make a POST request to add a new car
    const response = await fetch('http://localhost:8080/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
  
    if (response.ok) {
      const newCar = await response.json();
      this.setState((prevState) => ({ 
        cars: newCar,
      }));
      this.clearForm(); // Clear the form after adding a car
    } else {
      console.error(`Failed to add car: ${response.status} ${response.statusText}`);
    }
  }
  

  // Method to delete a car
  handleDelete = async (car) => {
    // Make a DELETE request to delete a car
    const response = await fetch(`http://localhost:8080/api/${car.id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Fetch updated list of cars from the server
      const updatedCars = await fetch('http://localhost:8080/api')
        .then(response => response.json());
      // Update the state with the fetched data
      this.setState({ cars: updatedCars });
    } else {
      console.error(`Failed to delete car: ${response.status} ${response.statusText}`);
    }
  }

  // Method to start update mode and populate form with car details
  startUpdate = (car) => {
    this.setState({ 
      id: car.id, 
      make: car.make, 
      model: car.model, 
      seats: car.seats.toString(),
      isUpdating: true
    });
  }

  // Method to update a car
  handleUpdate = async (carData) => {
    const { id } = this.state; // Destructure id from state
    // Make a PUT request to update a car
    const response = await fetch(`http://localhost:8080/api/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (response.ok) {
      // Fetch updated list of cars from the server
      const updatedCars = await fetch('http://localhost:8080/api')
        .then(response => response.json());
      // Update the state with the fetched data
      this.setState({ cars: updatedCars });
      this.clearForm(); // Clear the form after updating a car
    } else {
      console.error(`Failed to update car: ${response.status} ${response.statusText}`);
    }
  }

  // Render method to display the component
  render() {
    const { cars, make, model, seats, isUpdating } = this.state; // Destructure state
  
    return (
      // Return JSX to be rendered
      <div className="App">
        <h1>Car List</h1>
        <p>Enter car details below and click 'Add New' to add a car to the list. To update a car, click 'Update' next to the car, change the details and click 'Update'.</p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="make" value={make} onChange={this.handleChange} placeholder="Make" />
          <input type="text" name="model" value={model} onChange={this.handleChange} placeholder="Model" />
          <input type="text" name="seats" value={seats} onChange={this.handleChange} placeholder="Seats" />
          <button type="submit">{isUpdating ? 'Update' : 'Add New'}</button>
        </form>
        {cars.map(car => (
          <div className="car-item" key={car.id}>
            <h2>{car.make} {car.model}</h2>
            <p>ID: {car.id}</p>
            <p>Seats: {car.seats}</p>
            <button onClick={() => this.handleDelete(car)}>Delete</button>
            <button onClick={() => this.startUpdate(car)}>Update</button>
          </div>
        ))}
      </div>
    );
  }
}  

// Export App component
export default App;
