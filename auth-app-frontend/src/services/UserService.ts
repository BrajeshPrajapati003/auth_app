import apiClient from "@/config/ApiClient";

export const getUserById = async (userId: string) => {
  const res = await apiClient.get(`/users/${userId}`);
  return res.data;
};

export const updateUserProfile = async (userId: string, data: {
  name?: string;
  image?: string;
}) => {
  const res = await apiClient.put(`/users/${userId}`, data);
  return res.data;
};


// export const changePassword = async (
//   userId: string,
//   data: { currentPassword: string; newPassword: string }
// ) => {
//   const res = await apiClient.put(`/users/${userId}/password`, data);
//   return res.data;
// };
