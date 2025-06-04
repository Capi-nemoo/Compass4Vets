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
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">No profile found.</h1>
        <p className="mb-6 text-gray-600">It looks like you haven't created a profile yet or it's not stored correctly.</p>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Link href="/register">Create Your Profile</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Compass4Vets Profile</h1>

      <section className="mb-8 p-6 border border-gray-200 rounded-md">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Account Information</h2>
        <div className="space-y-3">
          <div>
            <strong className="text-gray-600">Full Name:</strong>
            <p className="text-gray-800 text-lg">{userProfile.fullName || "(Not set)"}</p>
          </div>
          <div>
            <strong className="text-gray-600">Email Address:</strong>
            <p className="text-gray-800 text-lg">{userProfile.email || "(Not set)"}</p>
          </div>
          <div>
            <strong className="text-gray-600">Branch of Service:</strong>
            <p className="text-gray-800 text-lg">{userProfile.branchOfService || "(Not set)"}</p>
          </div>
        </div>
      </section>

      <section className="mb-8 p-6 border border-gray-200 rounded-md">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Veteran Profile Details</h2>
        <div className="space-y-3">
          <div>
            <strong className="text-gray-600">Years of Service:</strong>
            <p className="text-gray-800 text-lg">{userProfile.yearsOfService || <span className="text-gray-500 italic">(Not set - click 'Edit Profile' to add)</span>}</p>
          </div>
          <div>
            <strong className="text-gray-600">Interests:</strong>
            <p className="text-gray-800 text-lg">{userProfile.interests || <span className="text-gray-500 italic">(Not set - click 'Edit Profile' to add)</span>}</p>
          </div>
          <div>
            <strong className="text-gray-600">Needs:</strong>
            <p className="text-gray-800 text-lg">{userProfile.needs || <span className="text-gray-500 italic">(Not set - click 'Edit Profile' to add)</span>}</p>
          </div>
        </div>
      </section>

      <div className="text-center mt-8">
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 text-lg rounded-md">
          <Link href="/profile/edit">Edit Profile</Link>
        </Button>
      </div>
    </div>
  );
}
