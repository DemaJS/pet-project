import axios from "axios";

const networkAPI = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  withCredentials: true,
  headers: {
    "API-KEY": "c2b8cbaf-b19e-4763-b68e-015f5b7c7690",
  },
});

const toDolistAPI = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "c2b8cbaf-b19e-4763-b68e-015f5b7c7690",
  },
});

export const API = {
  setAuth() {
    return networkAPI.get("/auth/me");
  },
  login(email: string, password: string) {
    return toDolistAPI.post("/auth/login", { email, password });
  },
  logout() {
    return toDolistAPI.delete("/auth/login");
  },
  setProfile(userID: number) {
    return networkAPI.get(`/profile/${userID}`);
  },
  updateProfile(profile: any) {
    return networkAPI.put(`/profile`, { ...profile });
  },
  setUsers(pageSize: number, currentPage: number) {
    return networkAPI.get(`/users?count=${pageSize}&page=${currentPage}`);
  },
  followUser(userId: number) {
    return networkAPI.post(`/follow/${userId}`, {});
  },
  unfollowUser(userId: number) {
    return networkAPI.delete(`/follow/${userId}`);
  },
  setToDo() {
    return toDolistAPI.get("/todo-lists");
  },
  addToDo(title: string) {
    return toDolistAPI.post("/todo-lists", { title });
  },
  deleteToDo(id: string) {
    return toDolistAPI.delete(`/todo-lists/${id}`);
  },
  setTask(todoID: string) {
    return toDolistAPI.get(`/todo-lists/${todoID}/tasks`);
  },
  addTask(todoID: string, title: string) {
    return toDolistAPI.post(`/todo-lists/${todoID}/tasks`, { title });
  },
  deleteTask(todoID: string, taskID: string) {
    return toDolistAPI.delete(`/todo-lists/${todoID}/tasks/${taskID}`);
  },
};
