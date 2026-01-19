import useAuth from "@/auth/store";
import axios from "axios"

const ApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8083/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000
});

ApiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuth.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});


// Auto logout on 401
ApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAuth.getState();
      logout(true); // silent logout
    }
    return Promise.reject(error);
  }
);



export default ApiClient;
