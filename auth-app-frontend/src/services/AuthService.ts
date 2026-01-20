import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
import type RegisterData from "@/models/RegisterData";
import type User from "@/models/User";


// Register function
export const registerUser = async (signupData: RegisterData) => {
  //   API calls to server to save data
    const response = await apiClient.post(`/auth/register`, signupData);
    return response.data;
};


// Login
export const loginUser = async (loginData: LoginData) => {
  const response = await apiClient.post<LoginResponseData>("/auth/login", loginData);
  return response.data;
}


// Logout
export const logoutUser = async ()=> {
  const response = await apiClient.post(`/auth/logout`);
  return response.data;
}


// Get current login user
export const getCurrentUser = async (emailId: string | undefined) => {
  const response = await apiClient.get<User>(`/users/email/${emailId}`);
  return response.data;
}

// Refresh token

// APIs
