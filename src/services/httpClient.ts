"use client";
import axios from "axios";
import { toast } from "react-toastify";

const axiosReq = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Dynamically update the token in the headers, whenever it changes when making requests.
axiosReq.interceptors.request.use(
  function (config) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosReq.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if ([401].includes(error.response?.status)) {
      window.location.replace("/login");
    }
    if (error.response?.status === 403) {
      toast(
        error.response.data.message ??
          "You do not have access to this resource",
        { type: "warning" }
      );
    } else {
      toast(error.response?.data.message ?? error.response?.data.msg ?? "", {
        type: "error",
      });
    }
    return Promise.reject(error); // Handle and display error messages to the user.
  }
);

export default axiosReq;
