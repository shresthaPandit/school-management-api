// API base URL - update this with your actual API URL
const API_BASE_URL = 'http://localhost:3000/api';

// Add event listener for form submission
document.getElementById('addSchoolForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const schoolData = {
        name: document.getElementById('schoolName').value,
        address: document.getElementById('address').value,
        latitude: parseFloat(document.getElementById('latitude').value),
        longitude: parseFloat(document.getElementById('longitude').value)
    };

    try {
        const response = await fetch(`${API_BASE_URL}/addSchool`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(schoolData)
        });

        const result = await response.json();

        if (result.success) {
            showMessage('School added successfully!', 'success');
            document.getElementById('addSchoolForm').reset();
            // Refresh the schools list if coordinates are available
            const userLat = document.getElementById('userLatitude').value;
            const userLon = document.getElementById('userLongitude').value;
            if (userLat && userLon) {
                listSchools();
            }
        } else {
            showMessage(result.message || 'Failed to add school', 'error');
        }
    } catch (error) {
        showMessage('Error connecting to the server', 'error');
        console.error('Error:', error);
    }
});

// Function to delete a school
async function deleteSchool(schoolId) {
    if (!confirm('Are you sure you want to delete this school?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/deleteSchool/${schoolId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            showMessage('School deleted successfully!', 'success');
            // Refresh the schools list
            const userLat = document.getElementById('userLatitude').value;
            const userLon = document.getElementById('userLongitude').value;
            if (userLat && userLon) {
                listSchools();
            }
        } else {
            showMessage(result.message || 'Failed to delete school', 'error');
        }
    } catch (error) {
        showMessage('Error connecting to the server', 'error');
        console.error('Error:', error);
    }
}

// Function to list schools
async function listSchools() {
    const userLat = document.getElementById('userLatitude').value;
    const userLon = document.getElementById('userLongitude').value;

    if (!userLat || !userLon) {
        showMessage('Please enter your location coordinates', 'error');
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/listSchools?latitude=${userLat}&longitude=${userLon}`
        );

        const result = await response.json();

        if (result.success) {
            displaySchools(result.data);
        } else {
            showMessage(result.message || 'Failed to fetch schools', 'error');
        }
    } catch (error) {
        showMessage('Error connecting to the server', 'error');
        console.error('Error:', error);
    }
}

// Function to display schools in the list
function displaySchools(schools) {
    const schoolsList = document.getElementById('schoolsList');
    schoolsList.innerHTML = ''; // Clear existing list

    if (schools.length === 0) {
        schoolsList.innerHTML = '<p>No schools found</p>';
        return;
    }

    schools.forEach(school => {
        const schoolElement = document.createElement('div');
        schoolElement.className = 'school-item';
        schoolElement.innerHTML = `
            <button class="delete-btn" onclick="deleteSchool(${school.id})">Delete</button>
            <h3>${school.name}</h3>
            <p><strong>Address:</strong> ${school.address}</p>
            <p><strong>Distance:</strong> ${school.distance} km</p>
            <p><strong>Coordinates:</strong> ${school.latitude}, ${school.longitude}</p>
        `;
        schoolsList.appendChild(schoolElement);
    });
}

// Utility function to show messages
function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;

    // Insert message at the top of the container
    const container = document.querySelector('.container');
    container.insertBefore(messageElement, container.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Optional: Get user's current location
function getCurrentLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            document.getElementById('userLatitude').value = position.coords.latitude;
            document.getElementById('userLongitude').value = position.coords.longitude;
        });
    }
}

// Add event listener for page load to get user's location
document.addEventListener('DOMContentLoaded', getCurrentLocation); 