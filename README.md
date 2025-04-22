# School Management System

A full-stack web application for managing schools and finding nearby educational institutions.

## Features

- Add new schools with location data
- List schools sorted by proximity to user's location
- Delete schools from the database
- Automatic geolocation detection
- Distance calculation in kilometers
- Interactive and responsive UI

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- Express Validator for input validation
- CORS enabled
- Helmet for security

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Geolocation API

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd school-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
- Create a MySQL database
- Import the schema from `sql/schema.sql`
- Create a `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_DATABASE=school_management
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

5. Open `index.html` in your browser to access the frontend.

## API Endpoints

### Add School
- **POST** `/api/addSchool`
- Body:
```json
{
    "name": "School Name",
    "address": "School Address",
    "latitude": 40.7128,
    "longitude": -74.0060
}
```

### List Schools
- **GET** `/api/listSchools?latitude=40.7128&longitude=-74.0060`
- Query parameters:
  - latitude: User's latitude
  - longitude: User's longitude

### Delete School
- **DELETE** `/api/deleteSchool/:id`
- URL parameter:
  - id: School ID to delete

## Frontend Features

- Clean and modern UI
- Form validation
- Automatic geolocation detection
- Real-time distance calculations
- Success/error notifications
- Confirmation dialogs for delete operations

## Security Features

- Input validation
- SQL injection protection
- XSS protection via Helmet
- CORS enabled
- Error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 