"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UserProfile {
  fullName: string;
  email: string;
  branchOfService: string;
  yearsOfService: string;
  interests: string;
  needs: string;
}

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">No profile found.</h1>
        <p className="mb-6 text-muted-foreground">It looks like you haven't created a profile yet or it's not stored correctly.</p>
        <Button asChild >
          <Link href="/register">Create Your Profile</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl bg-background shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Your Compass4Vets Profile</h1>

      <section className="mb-8 p-6 border border-accent rounded-md bg-card">
        <h2 className="text-xl font-semibold mb-4 text-primary">Account Information</h2>
        <div className="space-y-3">
          <div>
            <strong className="text-muted-foreground">Full Name:</strong>
            <p className="text-foreground text-lg">{userProfile.fullName || "(Not set)"}</p>
          </div>
          <div>
            <strong className="text-muted-foreground">Email Address:</strong>
            <p className="text-foreground text-lg">{userProfile.email || "(Not set)"}</p>
          </div>
          <div>
            <strong className="text-muted-foreground">Branch of Service:</strong>
            <p className="text-foreground text-lg">{userProfile.branchOfService || "(Not set)"}</p>
          </div>
        </div>
      </section>

      <section className="mb-8 p-6 border border-accent rounded-md bg-card">
        <h2 className="text-xl font-semibold mb-4 text-primary">Veteran Profile Details</h2>
        <div className="space-y-3">
          <div>
            <strong className="text-muted-foreground">Years of Service:</strong>
            <p className="text-foreground text-lg">{userProfile.yearsOfService || <span className="text-muted-foreground italic">(Not set - click 'Edit Profile' to add)</span>}</p>
          </div>
          <div>
            <strong className="text-muted-foreground">Interests:</strong>
            <p className="text-foreground text-lg">{userProfile.interests || <span className="text-muted-foreground italic">(Not set - click 'Edit Profile' to add)</span>}</p>
          </div>
          <div>
            <strong className="text-muted-foreground">Needs:</strong>
            <p className="text-foreground text-lg">{userProfile.needs || <span className="text-muted-foreground italic">(Not set - click 'Edit Profile' to add)</span>}</p>
          </div>
        </div>
      </section>

      <div className="text-center mt-8">
        <Button asChild className="py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/profile/edit">Edit Profile</Link>
        </Button>
      </div>
    </div>
  );
}
