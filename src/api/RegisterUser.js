const API_BASE_URL = 'https://v2.api.noroff.dev/holidaze';

export const registerUser = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Error registering user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};











/*{
  "name": "my_username", // Required
  "email": "first.last@stud.noroff.no", // Required
  "password": "UzI1NiIsInR5cCI", // Required
  "bio": "This is my profile bio", // Optional
  "avatar": {
    "url": "https://img.service.com/avatar.jpg", // Optional
    "alt": "My avatar alt text" // Optional
  },
  "banner": {
    "url": "https://img.service.com/banner.jpg", // Optional
    "alt": "My banner alt text" // Optional
  },
  "venueManager": true // Optional
} */  

  