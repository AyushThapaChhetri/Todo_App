import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:5000/api",
    // baseURL: "http://192.168.1.102:5000/api",
    baseURL: import.meta.env.VITE_API_URL,
});


// Global variables to manage refresh state
let isRefreshing = false;
let refreshSubscribers = [];

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    // If the response is successful, just return it.
    (response) => response,

    // If there's an error, handle it here (like expired token).
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshToken = localStorage.getItem("refreshToken");
                    if (!refreshToken) {
                        console.log("No refresh token available");
                        return Promise.reject("No refresh token found");
                    }
                    // console.log("Sending refresh token:", refreshToken);
                    const response = await axios.post(
                        // "http://192.168.1.102:5000/api/auth/refresh",
                        `${import.meta.env.VITE_API_URL}/auth/refresh`,
                        { refreshToken },
                        { headers: { "Content-Type": "application/json" } }
                    );

                    // console.log("Response .data", response.data);
                    // console.log("Response .data", response.data.data);
                    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
                    // console.log("Access Token: ", accessToken);
                    // console.log("Refresh Token: ", refreshToken);

                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", newRefreshToken);

                    // Update the original request
                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;


                    // Resolve all queued requests with the new token
                    refreshSubscribers.forEach((callback) => callback(accessToken));
                    refreshSubscribers = [];

                    return api(originalRequest);
                } catch (refreshError) {
                    console.error("Refresh token failed", refreshError);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";


                    // Notify subscribers of the failure
                    refreshSubscribers.forEach((callback) => callback(null));
                    refreshSubscribers = [];

                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
            else {
                // Queue the request to wait for the refresh to complete
                return new Promise((resolve, reject) => {
                    refreshSubscribers.push((accessToken) => {
                        if (accessToken) {
                            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                            resolve(api(originalRequest));
                        } else {
                            reject(new Error("Refresh token failed"));
                        }
                    });
                });
            }
        }
        return Promise.reject(error);
    }
);

export default api;