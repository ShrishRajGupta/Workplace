import api from "./client";

export const getAllPosts = () => api.get("/home").then((r) => r.data.posts);
export const getMyPosts = () => api.get("/user/allposts").then((r) => r.data.allposts);
export const getUserPosts = (userId) => api.get(`/user/allposts/${userId}`).then((r) => r.data.allposts);
export const createPost = (details) => api.post("/user/jobpostform", details).then((r) => r.data.post);
