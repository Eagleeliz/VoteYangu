"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/context/ToastContext";

export type UssdStep =
  | "start"
  | "vote_select"
  | "vote_confirm"
  | "vote_done"
  | "ask_question"
  | "question_done"
  | "results"
  | "popular"
  | "upvote"
  | "upvote_done"
  | "exit";

interface UssdState {
  step: UssdStep;
  input: string;
  selected?: string;
  history: string[];
}

interface UseUssdReturn {
  state: UssdState;
  displayText: string;
  log: string[];
  smsPreview: string | null;
  inputKey: (key: string) => void;
  send: () => void;
  cancel: () => void;
}

const STEP_TEXT: Record<UssdStep, string> = {
  start: "Welcome to VoteBridge\n\n1. Vote\n2. Ask Question\n3. View Results\n4. Popular Questions\n5. Exit",
  vote_select: "ACTIVE POLL\nBest New Artist\n\n1. Artist A\n2. Artist B\n3. Artist C",
  vote_confirm: "You selected:\n\n{artist}\n\n1. Confirm\n2. Cancel",
  vote_done: "Vote recorded successfully.\n\nThank you for participating.",
  ask_question: "Ask a Question\n\nPlease enter your question:",
  question_done: "Your question has been submitted successfully.\n\nThank you.",
  results: "CURRENT RESULTS\n\nBest New Artist\n\n1. Artist A - 47.8%\n2. Artist B - 35.5%\n3. Artist C - 16.7%\n\n1. More\n2. Back",
  popular: "POPULAR QUESTIONS\n\n1. What inspired..?\n2. When is next..?\n3. Who is biggest..?\n\nSelect question:",
  upvote: "You selected:\n\nWhat inspired your album?\n\n1. Upvote\n2. Back",
  upvote_done: "Question upvoted!\n\nThank you.",
  exit: "Thank you for using VoteBridge.",
};

export function useUssd(): UseUssdReturn {
  const { showToast } = useToast();
  const [state, setState] = useState<UssdState>({
    step: "start",
    input: "",
    history: ["System ready. Dial *123# to begin."],
  });
  const [smsPreview, setSmsPreview] = useState<string | null>(null);

  const getDisplayText = useCallback((s: UssdState): string => {
    let text = STEP_TEXT[s.step];
    if (s.step === "vote_confirm" && s.selected) {
      const artist = s.selected === "1" ? "Artist A" : s.selected === "2" ? "Artist B" : "Artist C";
      text = text.replace("{artist}", artist);
    }
    return text;
  }, []);

  const inputKey = useCallback((key: string) => {
    setState((prev) => ({
      ...prev,
      input: prev.input + key,
      history: [...prev.history, `Key pressed: ${key}`],
    }));
  }, []);

  const send = useCallback(() => {
    const input = state.input || "1";
    setState((prev) => ({
      ...prev,
      history: [...prev.history, `→ Sent: ${input}`],
    }));

    setState((prev) => {
      const s = { ...prev, input: "" };
      switch (s.step) {
        case "start":
          if (input === "1" || input === "") s.step = "vote_select";
          else if (input === "2") s.step = "ask_question";
          else if (input === "3") s.step = "results";
          else if (input === "4") s.step = "popular";
          else if (input === "5") s.step = "exit";
          break;
        case "vote_select":
          s.selected = input || "1";
          s.step = "vote_confirm";
          break;
        case "vote_confirm":
          if (input === "1" || input === "") {
            s.step = "vote_done";
            setSmsPreview(
              "Your vote for Artist B in \"Best New Artist\" has been recorded successfully.\n\nThank you for participating in VoteBridge."
            );
            showToast("Vote confirmation SMS sent!", "success");
          } else {
            s.step = "start";
          }
          break;
        case "vote_done":
        case "question_done":
        case "upvote_done":
        case "exit":
          s.step = "start";
          setSmsPreview(null);
          break;
        case "ask_question":
          s.step = "question_done";
          setSmsPreview(
            "Your question has been submitted successfully.\n\nThank you for participating in VoteBridge."
          );
          showToast("Question confirmation SMS sent!", "success");
          break;
        case "results":
          s.step = "start";
          break;
        case "popular":
          s.step = "upvote";
          break;
        case "upvote":
          if (input === "1" || input === "") {
            s.step = "upvote_done";
            showToast("Question upvoted via USSD!", "success");
          } else {
            s.step = "popular";
          }
          break;
      }
      return s;
    });
  }, [state.input, showToast]);

  const cancel = useCallback(() => {
    setState({ step: "start", input: "", history: [...state.history, "Session cancelled"] });
    setSmsPreview(null);
  }, [state.history]);

  return {
    state,
    displayText: getDisplayText(state),
    log: state.history,
    smsPreview,
    inputKey,
    send,
    cancel,
  };
}
