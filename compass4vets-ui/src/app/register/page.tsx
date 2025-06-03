"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [years, setYears] = useState("");
  const [interests, setInterests] = useState("");
  const [needs, setNeeds] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const profile = { name, branch, years, interests, needs };
    if (typeof window !== "undefined") {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
    router.push("/profile");
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Create Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Branch of Service" value={branch} onChange={(e) => setBranch(e.target.value)} />
        <Input placeholder="Years of Service" value={years} onChange={(e) => setYears(e.target.value)} />
        <textarea
          placeholder="Interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2"
        />
        <textarea
          placeholder="Needs"
          value={needs}
          onChange={(e) => setNeeds(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2"
        />
        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  );
}
