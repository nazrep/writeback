"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || typeof window === "undefined") return;
    const consent = typeof localStorage !== "undefined" ? localStorage.getItem("cookie_consent") : null;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: "identified_only",
      opt_out_capturing_by_default: consent !== "accepted",
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
