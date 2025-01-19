import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Function to fetch admin data
const loginAdmin = async (formData) => {
    try {
      console.log("Admin login form data:", formData);
  
      const response = await axios.post(
        `${apiUrl}/api/v1/admin/login`, // Adjust the URL as per your backend route
        formData,
        { withCredentials: true }
      );
  
      console.log("Admin login response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert(error.response.data.message || "An error occurred. Please try again.");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        alert("No response from the server. Please check your connection.");
      } else {
        console.error("Error in request setup:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };
  
const fetchAdminData = async () => {
  try {
    const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    const response = await axios.get(`${apiUrl}/api/v1/admin/data`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to update admin data
const updateAdminData = async (adminData) => {
  try {
    const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    const response = await axios.put(`${apiUrl}/api/v1/admin/data`, adminData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to delete admin data (if applicable)
const deleteAdminData = async (adminId) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.delete(`${apiUrl}/api/v1/admin/data/${adminId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Error handling function
const handleError = (error) => {
  if (error.response) {
    console.error("Server error:", error.response.data);
    alert(error.response.data.message || "An error occurred. Please try again.");
  } else if (error.request) {
    console.error("No response from server:", error.request);
    alert("No response from the server. Please check your connection.");
  } else {
    console.error("Error in request setup:", error.message);
    alert("An unexpected error occurred.");
  }
};

export { loginAdmin, fetchAdminData, updateAdminData, deleteAdminData };
