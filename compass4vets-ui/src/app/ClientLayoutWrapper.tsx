"use client";

import InteractiveHeader from "../components/InteractiveHeader";
import React from "react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InteractiveHeader />
      <main className="pt-16"> {/* This padding ensures content isn't hidden behind the fixed header */}
        {children}
      </main>
    </>
  );
}
