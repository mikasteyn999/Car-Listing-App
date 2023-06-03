# Car List Management Application

This application is a full stack JavaScript application with a React frontend and an Express.js backend. It allows users to manage a list of cars.

## Requirements

- Node.js
- npm

## Setup and Installation

### Backend

1. Navigate into the backend directory:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    node index.js
    ```

### Frontend

1. Navigate into the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the React application:

    ```bash
    npm start
    ```

## Usage

Once both the backend and frontend servers are running, you can access the application by opening your web browser and navigating to `http://localhost:3000`.

Here, you'll see a form at the top of the page that allows you to add new cars to the list. You can enter the make, model, and number of seats for the car, then click 'Add New' to add the car to the list.

Each car in the list has two buttons next to it. The 'Delete' button removes the car from the list, while the 'Update' button allows you to modify the details of the car. When you click 'Update', the details of the car are populated in the form at the top of the page, allowing you to change them and click 'Update' to save your changes.

## API Endpoints

- `GET /api`: Returns the list of all cars.
- `POST /api`: Adds a new car to the list.
- `DELETE /api/:id`: Deletes the car with the given `id` from the list.
- `PUT /api/:id`: Updates the car with the given `id`.

## Notes

This is a simple in-memory API, so data will be lost when the server restarts. It's suitable for testing and development, but not for production use.
