"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Profile {
  name: string;
  branch: string;
  years: string;
  interests: string;
  needs: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("profile");
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    }
  }, []);

  if (!profile) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">No profile found</h1>
        <Link href="/register" className="text-blue-600 underline">
          Create your profile
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl p-6 space-y-2">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Branch of Service:</strong> {profile.branch}
      </p>
      <p>
        <strong>Years of Service:</strong> {profile.years}
      </p>
      <p>
        <strong>Interests:</strong> {profile.interests}
      </p>
      <p>
        <strong>Needs:</strong> {profile.needs}
      </p>
      <Button asChild>
        <Link href="/register">Edit Profile</Link>
      </Button>
    </div>
  );
}
