"use client";

import { useState, useEffect, useCallback } from "react";
import type { Poll, PollOption, PollResults, VoteRequest } from "@/types";
import { pollsApi } from "@/lib/api";
import { demoPoll, demoPollOptions } from "@/lib/demo-data";
import { useToast } from "@/context/ToastContext";

// Set to false to use real API
const USE_DEMO_DATA = true;

interface UsePollReturn {
  poll: Poll | null;
  options: PollOption[];
  results: PollResults | null;
  isLoading: boolean;
  error: string | null;
  userVote: string | null;
  selectedOption: string | null;
  selectOption: (id: string) => void;
  submitVote: () => Promise<void>;
  refresh: () => void;
}

export function usePoll(pollId: string): UsePollReturn {
  const { showToast } = useToast();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [options, setOptions] = useState<PollOption[]>([]);
  const [results, setResults] = useState<PollResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const fetchPoll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (USE_DEMO_DATA) {
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 300));
        setPoll(demoPoll);
        setOptions(demoPollOptions);
        const total = demoPollOptions.reduce((sum, o) => sum + (o.voteCount || 0), 0);
        setResults({
          pollId: demoPoll.id,
          totalVotes: total,
          channels: { online: Math.floor(total * 0.6), ussd: Math.floor(total * 0.4) },
          options: demoPollOptions,
        });
      } else {
        const [pollRes, resultsRes] = await Promise.all([
          pollsApi.get(pollId),
          pollsApi.results(pollId),
        ]);
        setPoll(pollRes.data);
        setResults(resultsRes.data);
        setOptions(resultsRes.data.options);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load poll");
    } finally {
      setIsLoading(false);
    }
  }, [pollId]);

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  const selectOption = useCallback((id: string) => {
    if (userVote) return;
    setSelectedOption(id);
  }, [userVote]);

  const submitVote = useCallback(async () => {
    if (!selectedOption) return;
    try {
      if (USE_DEMO_DATA) {
        await new Promise((r) => setTimeout(r, 400));
        setUserVote(selectedOption);
        showToast("Your vote has been recorded successfully!", "success");
      } else {
        const res = await pollsApi.vote(pollId, {
          optionId: selectedOption,
          channel: "ONLINE",
        });
        if (res.data.success) {
          setUserVote(selectedOption);
          showToast(res.data.message, "success");
          fetchPoll(); // Refresh results
        }
      }
    } catch (err) {
      showToast("Failed to submit vote. Please try again.", "error");
    }
  }, [selectedOption, pollId, fetchPoll, showToast]);

  return {
    poll,
    options,
    results,
    isLoading,
    error,
    userVote,
    selectedOption,
    selectOption,
    submitVote,
    refresh: fetchPoll,
  };
}
