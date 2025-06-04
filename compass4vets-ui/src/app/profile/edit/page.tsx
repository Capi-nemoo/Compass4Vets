"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Assuming this exists or will be added

interface UserProfile {
  fullName: string;
  email: string;
  branchOfService: string;
  yearsOfService: string;
  interests: string;
  needs: string;
}

// It's good practice to define an interface for errors
interface FormErrors {
  fullName?: string;
  email?: string;
  branchOfService?: string;
  // Optional fields don't necessarily need error states unless they have specific validation rules
}

export default function EditProfilePage() {
  const router = useRouter();
  const [initialProfile, setInitialProfile] = useState<UserProfile | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [branchOfService, setBranchOfService] = useState("");
  const [yearsOfService, setYearsOfService] = useState("");
  const [interests, setInterests] = useState("");
  const [needs, setNeeds] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        const parsedProfile: UserProfile = JSON.parse(storedProfile);
        setInitialProfile(parsedProfile);
        setFullName(parsedProfile.fullName || "");
        setEmail(parsedProfile.email || "");
        setBranchOfService(parsedProfile.branchOfService || "");
        setYearsOfService(parsedProfile.yearsOfService || "");
        setInterests(parsedProfile.interests || "");
        setNeeds(parsedProfile.needs || "");
      } else {
        // If no profile, redirect to create one, or show an error
        // For now, let's assume a profile should exist if they reach edit page
        router.push("/profile"); // Or /register
      }
      setIsLoading(false);
    }
  }, [router]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name cannot be empty.";
    if (!email.trim()) {
      newErrors.email = "Email address cannot be empty.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!branchOfService.trim()) newErrors.branchOfService = "Branch of service cannot be empty.";
    // Add more validation as needed for years, interests, needs if they have specific formats

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateForm()) {
      const updatedProfile: UserProfile = {
        fullName,
        email,
        branchOfService,
        yearsOfService,
        interests,
        needs,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        alert("Profile updated successfully!");
        router.push("/profile");
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading profile for editing...</p>
      </div>
    );
  }
  
  if (!initialProfile && !isLoading) {
     // This case should ideally be handled by the redirect in useEffect
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Profile Not Found</h1>
        <p className="mb-6 text-gray-600">We couldn't find your profile to edit. Please ensure you have created one.</p>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Link href="/register">Create Profile</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <h1 className="mt-6 text-center text-3xl md:text-4xl font-extrabold text-gray-900">
          Edit Your Compass4Vets Profile
        </h1>
        <p className="mt-2 text-center text-md md:text-lg text-gray-600">
          Keep your information up to date.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full ${errors.fullName ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-indigo-500 focus:border-indigo-500"} border-gray-300 rounded-md shadow-sm`}
                />
              </div>
              {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-indigo-500 focus:border-indigo-500"} border-gray-300 rounded-md shadow-sm`}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="branchOfService" className="block text-sm font-medium text-gray-700">
                Branch of Service
              </label>
              <div className="mt-1">
                <Input
                  id="branchOfService"
                  name="branchOfService"
                  type="text"
                  value={branchOfService}
                  onChange={(e) => setBranchOfService(e.target.value)}
                  className={`w-full ${errors.branchOfService ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-indigo-500 focus:border-indigo-500"} border-gray-300 rounded-md shadow-sm`}
                />
              </div>
              {errors.branchOfService && <p className="mt-2 text-sm text-red-600">{errors.branchOfService}</p>}
            </div>
            
            <div>
              <label htmlFor="yearsOfService" className="block text-sm font-medium text-gray-700">
                Years of Service <span className="text-xs text-gray-500">(Optional)</span>
              </label>
              <div className="mt-1">
                <Input
                  id="yearsOfService"
                  name="yearsOfService"
                  type="text" // Or number, depending on desired input
                  placeholder="e.g., 4 years, 2008-2012"
                  value={yearsOfService}
                  onChange={(e) => setYearsOfService(e.target.value)}
                  className="w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                Interests <span className="text-xs text-gray-500">(Optional)</span>
              </label>
              <div className="mt-1">
                <Textarea
                  id="interests"
                  name="interests"
                  rows={3}
                  placeholder="e.g., Technology, volunteering, outdoor activities"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="needs" className="block text-sm font-medium text-gray-700">
                Needs <span className="text-xs text-gray-500">(Optional)</span>
              </label>
              <div className="mt-1">
                <Textarea
                  id="needs"
                  name="needs"
                  rows={3}
                  placeholder="e.g., Career advice, networking, mental health resources"
                  value={needs}
                  onChange={(e) => setNeeds(e.target.value)}
                  className="w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
              <Button
                type="submit"
                className="w-full sm:w-auto flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/profile')}
                className="w-full sm:w-auto flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
