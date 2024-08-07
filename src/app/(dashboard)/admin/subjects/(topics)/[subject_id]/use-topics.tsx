"use client";

import axiosReq from "@/services/httpClient";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export interface Topic {
  id: string;
  title: string;
  description: string;
  video_url: string;
  isCompleted?: boolean;
}

export interface CreateTopicDTO {
  title: string;
  description: string;
  video_url: string;
}
export default function useTopics() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopicId, setCurrentTopicId] = useState("");
  const [currentTopic, setCurrentTopic] = useState<Topic>();
  const [completedAllTopics, setCompletedAllTopics] = useState<boolean>(false);

  const { subject_id: subjectId } = useParams();
  const getTopics = async () => {
    setLoading(true);
    try {
      const { data } = await axiosReq.get(
        `/topics/${subjectId}/with-completion-status/`,
        {
          headers: { "content-type": "application/json" },
        }
      );

      setTopics(data.topics);
      setCurrentTopic(data.topics[0]);

      const completedTopics = (data.subjects as Topic[]).map((topic) =>
        topics.every((topic) => topic.isCompleted)
      );
      setCompletedAllTopics(completedTopics.some((topic) => topic));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const completeTopic = async (topicId: string) => {
    try {
      setLoading(true);
      await axiosReq.post(`/topics/${topicId}/complete`, {
        headers: { "Content-Type": "application/json" },
      });
      const updatedTopics = topics.map((topic) =>
        topic.id === topicId ? { ...topic, isCompleted: true } : topic
      );
      setTopics(updatedTopics);
      const nextTopic = updatedTopics.find((topic) => !topic.isCompleted);
      setCurrentTopic(nextTopic || currentTopic);
      await getTopics();
    } finally {
      setLoading(false);
    }
  };
  const completeSubject = async () => {
    try {
      setLoading(true);
      await axiosReq.post(`/subjects/${subjectId}/complete`, {
        headers: { "Content-Type": "application/json" },
      });
      await getTopics();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createNewTopic = async (payload: CreateTopicDTO) => {
    try {
      if (!payload) {
        throw new Error("Payload is missing");
      }

      setLoading(true);
      await axiosReq.post(`/topics`, {
        ...payload,
        subjectId: subjectId || "",
      });
      await getTopics();
    } catch (error) {
      console.error("Error creating new topic:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const reqController = new AbortController();
    getTopics();

    return () => reqController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    getTopics,
    topics,
    currentTopicId,
    setCurrentTopicId,
    currentTopic,
    setCurrentTopic,
    completeTopic,
    completedAllTopics,
    completeSubject,
    createNewTopic,
  };
}
