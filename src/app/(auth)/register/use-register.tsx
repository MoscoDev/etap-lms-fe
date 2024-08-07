"use client";

import axiosReq from "@/services/httpClient";
import { useEffect, useState } from "react";
import { SignupForm } from "./page";
import { useRouter } from "next/navigation";

export default function useRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (payload: SignupForm) => {
    setLoading(true);
    try {
      const { data } = await axiosReq.post("/auth/register", payload, {
        headers: { "content-type": "application/json" },
      });

      router.push("./login");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return {
    loading,
    handleRegister,
  };
}
