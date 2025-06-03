"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function requireAuth<P>(Component: React.ComponentType<P>) {
  return function ProtectedPage(props: P) {
    const router = useRouter();
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const guest = sessionStorage.getItem("guest") === "true";
      const authenticated = localStorage.getItem("auth") === "true";
      if (guest || authenticated) {
        setAllowed(true);
      } else {
        router.replace("/");
      }
    }, [router]);

    if (!allowed) return null;
    return <Component {...props} />;
  };
}
