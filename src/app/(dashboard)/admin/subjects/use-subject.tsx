"use client";

import axiosReq from "@/services/httpClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreateSubject } from "./page";

export interface Subject {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isCompleted?: boolean;
}
export default function useSubjects() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const getSubjects = async () => {
    setLoading(true);
    try {
      const { data } = await axiosReq.get("/subjects", {
        headers: { "content-type": "application/json" },
        params: { page: currentPage, limit: coursesPerPage },
      });

      setSubjects(data.subjects);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
const createSubject = async (payload: CreateSubject) => {
  try {
    await axiosReq.post("/subjects",
       payload,
       {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
}
  useEffect(() => {
    console.log(currentPage);
    const reqController = new AbortController();
    getSubjects();

    return () => reqController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return {
    loading,
    getSubjects,
    subjects,
    currentPage,
    coursesPerPage,
    totalPages,
    total,
    setCurrentPage,
    createSubject
  };
}
