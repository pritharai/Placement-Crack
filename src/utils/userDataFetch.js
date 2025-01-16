import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;


const registerUser = async (formData) => {
  console.log("data post", formData);

  try {
    const response = await axios.post(`${apiUrl}/api/v1/user/signup`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user. Please try again.');
  }
};

const loginUser = async (formData) => {
  try {
    console.log("Login form data:", formData);

    const response = await axios.post(
      `${apiUrl}/api/v1/user/login`,
      formData,

      { withCredentials: true }
    );

    console.log("Login response:", response.data);
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

const logoutUser = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    // console.log(document.cookie.includes('accessToken'))
    // console.log(token)
    // console.log(formData)
    const response = await axios.post(`${apiUrl}/api/v1/user/logout`, { token }, { headers: { Authorization: `Bearer ${token}` } });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching logout data:', error);
  }
}

const refreshAccessToken = async () => {
  try {
    const token = localStorage.getItem('refreshToken');
    // console.log(token)
    // console.log(formData)
    const response = await axios.post(`${apiUrl}/api/v1/user/refreshtoken`, { headers: { Authorization: `Bearer ${token}` } });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching logout data:', error);
  }
}

const verifyOtp = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/user/verifyotp`, data);
    console.log("Response data:", response); // Successfully fetched response
    console.log("Response data:", response.data); // Successfully fetched response
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
  }
};


export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  verifyOtp
}