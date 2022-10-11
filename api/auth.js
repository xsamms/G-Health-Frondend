import apiClient from "./client";

const login = async (email, password) => {
  return await apiClient.post("/auth/login/", { email, password });
};

const register = async (
  fullname,
  email,
  phonenumber,
  password,
  address,
  city
) => {
  return await apiClient.post("/auth/register/", {
    fullname,
    email,
    phonenumber,
    password,
    address,
    city,
  });
};

// const getCustomers = async () => {
//   return await apiClient.get("/auth/customers/");
// };

// const getAdmins = async () => {
//   return await apiClient.get("/auth/adminUsers/");
// };

export default { login, register };
