"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  function handleLogin() {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth", "true");
      sessionStorage.removeItem("guest");
    }
    router.push("/community");
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <Button onClick={handleLogin}>Mock Sign In</Button>
    </div>
  );
}
