"use client";

import React, { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // ensure auth client is imported and initialized on mount
  useEffect(() => {
    // Accessing authClient ensures any internal listeners or atoms initialize
    void authClient;
  }, []);

  return <>{children}</>;
}