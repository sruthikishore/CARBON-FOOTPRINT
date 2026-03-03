import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000", // change later if needed
});

// Auth APIs
export const signupUser = (data) => API.post("/signup", data);
export const loginUser = (data) => API.post("/login", data);

// Future APIs (we will use later)
export const submitActivity = (data) => API.post("/activity", data);
export const getDashboard = () => API.get("/dashboard");
export const getPredictions = () => API.get("/prediction");
export const setGoal = (data) => API.post("/goals", data);
export const getGoalProgress = () => API.get("/goal-progress");
export const getRecommendations = () => API.get("/suggestions");

export default API;