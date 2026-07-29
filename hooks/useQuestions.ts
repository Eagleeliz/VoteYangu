"use client";

import { useState, useEffect, useCallback } from "react";
import type { Question, QuestionRequest } from "@/types";
import { questionsApi } from "@/lib/api";
import { demoQuestions } from "@/lib/demo-data";
import { useToast } from "@/context/ToastContext";

const USE_DEMO_DATA = true;

interface UseQuestionsReturn {
  questions: Question[];
  isLoading: boolean;
  error: string | null;
  upvotedIds: Set<string>;
  submitQuestion: (text: string) => Promise<void>;
  upvoteQuestion: (id: string) => Promise<void>;
  approveQuestion: (id: string) => Promise<void>;
  rejectQuestion: (id: string) => Promise<void>;
  featureQuestion: (id: string) => Promise<void>;
  refresh: () => void;
}

export function useQuestions(eventId: string): UseQuestionsReturn {
  const { showToast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (USE_DEMO_DATA) {
        await new Promise((r) => setTimeout(r, 300));
        setQuestions(demoQuestions);
      } else {
        const res = await questionsApi.list(eventId);
        setQuestions(res.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const submitQuestion = useCallback(async (text: string) => {
    try {
      if (USE_DEMO_DATA) {
        await new Promise((r) => setTimeout(r, 400));
        const newQ: Question = {
          id: `q-${Date.now()}`,
          eventId,
          questionText: text,
          channel: "ONLINE",
          submitterHash: "hash-online-new",
          status: "PENDING",
          upvotes: 0,
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setQuestions((prev) => [newQ, ...prev]);
        showToast("Question submitted for moderation!", "success");
      } else {
        await questionsApi.create(eventId, {
          questionText: text,
          channel: "ONLINE",
        });
        showToast("Question submitted!", "success");
        fetchQuestions();
      }
    } catch (err) {
      showToast("Failed to submit question.", "error");
    }
  }, [eventId, fetchQuestions, showToast]);

  const upvoteQuestion = useCallback(async (id: string) => {
    const isUpvoted = upvotedIds.has(id);
    try {
      if (USE_DEMO_DATA) {
        await new Promise((r) => setTimeout(r, 200));
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === id ? { ...q, upvotes: q.upvotes + (isUpvoted ? -1 : 1) } : q
          )
        );
        setUpvotedIds((prev) => {
          const next = new Set(prev);
          if (isUpvoted) next.delete(id);
          else next.add(id);
          return next;
        });
        showToast(isUpvoted ? "Upvote removed" : "Question upvoted!", "success");
      } else {
        await questionsApi.upvote(id);
        fetchQuestions();
      }
    } catch (err) {
      showToast("Failed to upvote.", "error");
    }
  }, [upvotedIds, fetchQuestions, showToast]);

  const approveQuestion = useCallback(async (id: string) => {
    try {
      if (USE_DEMO_DATA) {
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, status: "APPROVED" as const } : q)));
        showToast("Question approved", "success");
      } else {
        await questionsApi.approve(id);
        fetchQuestions();
      }
    } catch (err) {
      showToast("Failed to approve.", "error");
    }
  }, [fetchQuestions, showToast]);

  const rejectQuestion = useCallback(async (id: string) => {
    try {
      if (USE_DEMO_DATA) {
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, status: "REJECTED" as const } : q)));
        showToast("Question rejected", "info");
      } else {
        await questionsApi.reject(id);
        fetchQuestions();
      }
    } catch (err) {
      showToast("Failed to reject.", "error");
    }
  }, [fetchQuestions, showToast]);

  const featureQuestion = useCallback(async (id: string) => {
    try {
      if (USE_DEMO_DATA) {
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, featured: true } : q)));
        showToast("Question featured!", "success");
      } else {
        await questionsApi.feature(id);
        fetchQuestions();
      }
    } catch (err) {
      showToast("Failed to feature.", "error");
    }
  }, [fetchQuestions, showToast]);

  return {
    questions,
    isLoading,
    error,
    upvotedIds,
    submitQuestion,
    upvoteQuestion,
    approveQuestion,
    rejectQuestion,
    featureQuestion,
    refresh: fetchQuestions,
  };
}
