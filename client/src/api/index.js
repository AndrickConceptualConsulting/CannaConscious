const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API fetch function with error handling
async function fetchAPI(endpoint, options = {}) {
  try {
    const url = `${API_URL}/${endpoint}`;
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };
    
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Contact API functions
export const contactAPI = {
  // Send contact form
  sendContactForm: async (formData) => {
    return fetchAPI('contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  }
};

// Appointment API functions
export const appointmentAPI = {
  // Get available time slots for a date
  getAvailability: async (date) => {
    return fetchAPI(`appointments/availability/${date}`);
  },
  
  // Book an appointment
  bookAppointment: async (appointmentData) => {
    return fetchAPI('appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    });
  },
  
  // Cancel an appointment
  cancelAppointment: async (id) => {
    return fetchAPI(`appointments/${id}`, {
      method: 'DELETE'
    });
  }
};