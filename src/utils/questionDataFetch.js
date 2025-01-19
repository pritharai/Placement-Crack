
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;


const apiUrlforquiz = "https://quizapi.io/api/v1/questions";
const apiKey = "NvYq6voqIczJLcA5sANApm69bFw6rP7M3cNyiWXO"; // Your API Key


const fetchQuestions = async (params) => {
    const queryParams = new URLSearchParams({
      apiKey: apiKey,
      ...params,
    });
  
    try {
      const response = await fetch(`${apiUrlforquiz}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      return data; // Process or return the questions data
    } catch (error) {
      console.error('Error:', error);
      return { error: error.message }; // Error handling
    }
  };
   


  const getQuestionById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/questions/GetquestionbyID/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching question with ID ${id}:`, error);
      throw new Error('Failed to fetch question. Please try again.');
    }
  };

   const submitAnswer = async (id, answerData) => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/questions/SubmitAns/${id}`, answerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error submitting answer for question with ID ${id}:`, error);
      throw new Error('Failed to submit answer. Please try again.');
    }
  };


  
  

  export{ fetchQuestions,getQuestionById,submitAnswer}