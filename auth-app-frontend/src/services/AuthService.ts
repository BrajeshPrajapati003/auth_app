import apiClient from "@/config/ApiClient";
import type RegisterData from "@/models/RegisterData";


// Register function
export const registerUser = async (signupData: RegisterData) => {
  //   API calls to server to save data
    const response = await apiClient.post(`/auth/register`, signupData);
    return response.data;
};


// Login

// Get current login user

// Refresh token

// APIs

