# School Management API

A simple Node.js/Express API for managing school information, including adding, listing (sorted by distance), and deleting schools. It comes with a basic frontend interface for interaction.

## Features

*   **Add School:** Add a new school with its name, address, and geographical coordinates (latitude, longitude).
*   **List Schools:** Retrieve a list of schools sorted by their distance from a specified user location.
*   **Delete School:** Remove a school entry from the database.
*   **Basic Frontend:** An HTML/JavaScript interface to interact with the API functionalities.
*   **Security:** Uses `helmet` for basic security headers.
*   **CORS Enabled:** Allows cross-origin requests (configurable if needed).

## Technology Stack

*   **Backend:** Node.js, Express.js
*   **Middleware:**
    *   `cors`: For enabling Cross-Origin Resource Sharing.
    *   `helmet`: For securing Express apps by setting various HTTP headers.
    *   `dotenv`: For loading environment variables from a `.env` file.
*   **Database:** (Assumed - Requires configuration, e.g., PostgreSQL, MySQL, SQLite) - The project uses a database connection (`./src/config/db`) but the specific type isn't defined in the provided `server.js`.
*   **Frontend:** HTML, CSS, JavaScript (using Fetch API)

## Prerequisites

*   Node.js (v14 or later recommended)
*   npm or yarn
*   A configured database instance (e.g., PostgreSQL, MySQL)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd school-management-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Configuration

1.  Create a `.env` file in the root directory of the project.
2.  Add the necessary environment variables. At a minimum, you'll likely need:

    ```dotenv
    # Server Configuration
    PORT=3000
    NODE_ENV=development # or production

    # Database Configuration (Example for PostgreSQL - adjust as needed)
    DB_USER=your_db_user
    DB_HOST=localhost
    DB_DATABASE=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    ```

3.  Ensure your database is running and the schema (tables for schools) is set up according to the needs of your database logic in `./src/`.

## Running the Application

1.  **Start the server:**
    ```bash
    npm start
    # or directly using node
    node server.js
    # You might need to configure the "start" script in your package.json
    ```

2.  The API server will start, typically on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

*   **`GET /`**
    *   Description: Welcome message and basic API info.
    *   Response:
        ```json
        {
          "message": "Welcome to School Management API",
          "endpoints": {
            "addSchool": "/api/addSchool",
            "listSchools": "/api/listSchools"
          }
        }
        ```

*   **`POST /api/addSchool`**
    *   Description: Adds a new school to the database.
    *   Request Body:
        ```json
        {
          "name": "Example High School",
          "address": "123 Education Lane",
          "latitude": 40.7128,
          "longitude": -74.0060
        }
        ```
    *   Success Response (200 OK):
        ```json
        {
          "success": true,
          "message": "School added successfully!",
          "data": { /* ... school data ... */ }
        }
        ```
    *   Error Response (e.g., 400 Bad Request, 500 Internal Server Error):
        ```json
        {
          "success": false,
          "message": "Error message description"
        }
        ```

*   **`GET /api/listSchools`**
    *   Description: Lists schools, sorted by distance from the provided coordinates.
    *   Query Parameters:
        *   `latitude` (required): User's latitude.
        *   `longitude` (required): User's longitude.
    *   Example Request: `GET /api/listSchools?latitude=40.7128&longitude=-74.0060`
    *   Success Response (200 OK):
        ```json
        {
          "success": true,
          "data": [
            {
              "id": 1,
              "name": "Nearby School",
              "address": "456 Learning Ave",
              "latitude": 40.7130,
              "longitude": -74.0050,
              "distance": "0.15" // Distance in km (calculated by the backend)
            },
            // ... other schools
          ]
        }
        ```
    *   Error Response:
        ```json
        {
          "success": false,
          "message": "Error message description"
        }
        ```

*   **`DELETE /api/deleteSchool/:id`**
    *   Description: Deletes a school by its unique ID.
    *   URL Parameter:
        *   `id` (required): The ID of the school to delete.
    *   Example Request: `DELETE /api/deleteSchool/1`
    *   Success Response (200 OK):
        ```json
        {
          "success": true,
          "message": "School deleted successfully!"
        }
        ```
    *   Error Response (e.g., 404 Not Found, 500 Internal Server Error):
        ```json
        {
          "success": false,
          "message": "Error message description"
        }
        ```

## Frontend Usage

1.  Ensure the API server is running.
2.  Open the `index.html` file (or the relevant HTML file containing `script.js`) in your web browser.
3.  **Enter Location:** Input your latitude and longitude, or click "Get Current Location" (if browser permissions allow).
4.  **List Schools:** Click the "List Nearby Schools" button (or similar trigger, based on `listSchools()` function call). The list will populate below.
5.  **Add School:** Fill in the "Add New School" form and submit it.
6.  **Delete School:** Click the "Delete" button next to a school in the list.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



(Optional) Specify your license here, e.g., MIT License.
