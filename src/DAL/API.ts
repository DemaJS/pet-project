import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  withCredentials: true,
  headers: {
    "API-KEY": "c2e39203-417e-4936-90ba-36cd8b9b6c99",
  },
});

export const API = {
  setAuth() {
    return instance.get("/auth/me");
  },
  login(email: string, password: string) {
    return axios.post(
      "https://social-network.samuraijs.com/api/1.1/auth/login",
      { email, password },
      {
        withCredentials: true,
        headers: {
          "api-key": "c2b8cbaf-b19e-4763-b68e-015f5b7c7690",
        },
      }
    );
  },
  logout() {
    return axios.delete(
      "https://social-network.samuraijs.com/api/1.1/auth/login",
      {
        withCredentials: true,
        headers: {
          "api-key": "c2b8cbaf-b19e-4763-b68e-015f5b7c7690",
        },
      }
    );
  },
  setProfile(userID: number) {
    return instance.get(`/profile/${userID}`);
  },
  updateProfile(profile: any) {
    return instance.put(`/profile`, { ...profile });
  },
  setUsers(pageSize: number, currentPage: number) {
    return instance.get(`/users?count=${pageSize}&page=${currentPage}`);
  },
  followUser(userId: number) {
    return instance.post(`/follow/${userId}`, {});
  },
  unfollowUser(userId: number) {
    return instance.delete(`/follow/${userId}`);
  },
};
