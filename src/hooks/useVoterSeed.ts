"use client";

import { useEffect, useState } from "react";

const KEY = "vb_voter_seed";

export function useVoterSeed() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    let existing = localStorage.getItem(KEY);
    if (!existing) {
      existing = crypto.randomUUID();
      localStorage.setItem(KEY, existing);
    }
    setSeed(existing);
  }, []);

  return seed;
}
