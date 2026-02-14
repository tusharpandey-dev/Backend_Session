import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

export const getUsers = () => API.get("/get-users");
export const addUser = (data) => API.post("/add-user", data);
export const updateUser = (id, data) => API.put(`/user/${id}`, data);
export const deleteUser = (id) => API.delete(`/user/${id}`);
