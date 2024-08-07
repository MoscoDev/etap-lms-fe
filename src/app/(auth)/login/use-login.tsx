"use client";

import axiosReq from "@/services/httpClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "./page";

export default function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (payload: LoginForm) => {
    setLoading(true);
    try {
      const { data } = await axiosReq.post("/auth/login", payload, {
        headers: { "content-type": "application/json" },
      });
      localStorage.setItem("token", data.access_token);
      sessionStorage.setItem("user", JSON.stringify({username:data.username, role: data.role}))
      router.push("./dashboard");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return {
    loading,
    handleLogin,
  };
}
