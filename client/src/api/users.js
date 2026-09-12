import api from "./client";

export const getUser = (userId) => api.get(`/user/profile/${userId}`).then((r) => r.data.user);
export const getFriends = (userId) => api.get(`/user/friends/${userId}`).then((r) => r.data);
export const searchUsers = (term) => api.get(`/search/${encodeURIComponent(term)}`).then((r) => r.data.user);

export const sendConnectionRequest = (userId) => api.get(`/user/profile/${userId}/connect`).then((r) => r.data);
// Responds to a friend request; returns the updated current user.
export const respondToRequest = ({ from, to, requestId, action }) =>
  api.put(`/user/connect/${from}/${to}/${action}/${requestId}`).then((r) => r.data.user);

export const createProfile = (details) => api.post("/user/createProfile", details).then((r) => r.data.user);
export const updateInfo = ({ name, about }) => api.post("/in/update", { name, about }).then((r) => r.data);
export const addEducation = (entry) => api.post("/in/addCollege", entry).then((r) => r.data.education);
export const addWorkExperience = (entry) => api.post("/in/addWorkEx", entry).then((r) => r.data.workexperience);
export const addSkill = (entry) => api.post("/in/addSkills", entry).then((r) => r.data.skills);

export const uploadPhoto = (file) => {
  const formData = new FormData();
  formData.append("photo", file);
  return api.post("/in/add", formData).then((r) => r.data.url);
};
