import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // change later if needed
});

// Auth APIs
export const signupUser = (data) => API.post("/auth/signup", data);

export const loginUser = (data) => {
    const formData = new URLSearchParams();
    formData.append("username", data.email);   // backend expects username
    formData.append("password", data.password);

    return API.post("/auth/login", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
};

// Future APIs (we will use later)
export const submitActivity = (data) => API.post("/activity/", data);
export const getDashboard = () => API.get("/dashboard/");
export const getPredictions = () => API.get("/prediction");
export const setGoal = (data) => API.post("/goals", data);
export const getGoalProgress = () => API.get("/goal-progress");
//export const getRecommendations = () => API.get("/suggestions");
export const getActivityHistory = () => API.get("/activity/history");
export const getSuggestions = (data) =>
    API.post("/suggestions", data);

API.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.access_token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;