import api from "./client";

export const getAllPosts = (page = 1) => api.get("/home", { params: { page } }).then((r) => r.data.posts);
export const getMyPosts = () => api.get("/user/allposts").then((r) => r.data.allposts);
export const getUserPosts = (userId) => api.get(`/user/allposts/${userId}`).then((r) => r.data.allposts);
export const createPost = (details) => api.post("/user/jobpostform", details).then((r) => r.data.post);
export const getPost = (postId) => api.get(`/user/posts/${postId}`).then((r) => r.data.post);

// Applications. `application` is { fullName, email, phone, coverNote, resume?: File }.
export const applyToPost = (postId, application) => {
  const formData = new FormData();
  Object.entries(application).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") formData.append(key, value);
  });
  return api.post(`/user/posts/${postId}/apply`, formData).then((r) => r.data.application);
};
export const getApplicants = (postId) => api.get(`/user/posts/${postId}/applicants`).then((r) => r.data);
export const getApplicantCount = (postId) => api.get(`/user/posts/${postId}/applications/count`).then((r) => r.data.count);
export const getMyApplications = () => api.get("/user/applications").then((r) => r.data.applications);
