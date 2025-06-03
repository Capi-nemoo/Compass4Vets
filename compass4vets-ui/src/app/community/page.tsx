"use client";
import { requireAuth } from "@/components/requireAuth";

function CommunityPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Community</h1>
      <p>Welcome to the private community area.</p>
    </div>
  );
}

export default requireAuth(CommunityPage);
