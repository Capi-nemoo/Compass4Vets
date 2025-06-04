"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming this exists based on shadcn/ui setup

// It's good practice to define an interface for errors
interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  branchOfService?: string;
  terms?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [branchOfService, setBranchOfService] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Please create a password.";
    } else if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      newErrors.password = "Password must be at least 8 characters, including one number, one uppercase letter, and one lowercase letter.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!branchOfService.trim()) newErrors.branchOfService = "Please enter your branch of service.";
    if (!agreedToTerms) newErrors.terms = "You must agree to the Terms & Conditions and Privacy Policy.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateForm()) {
      const userProfile = {
        fullName,
        email,
        branchOfService,
        yearsOfService: '', // Initialize as empty
        interests: '',      // Initialize as empty
        needs: ''           // Initialize as empty
      };

      if (typeof window !== "undefined") {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
      }

      console.log("Form submitted and profile saved to localStorage:", userProfile);
      alert("Registration successful! Your profile has been created.");
      
      // Clear form fields
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setBranchOfService("");
      setAgreedToTerms(false);
      setErrors({});
      
      // Optionally, redirect to profile page or login
      // router.push('/profile'); 
      // router.push('/login');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h1 className="mt-6 text-center text-3xl md:text-4xl font-extrabold text-gray-900">
          Join Compass4Vets
        </h1>
        <p className="mt-2 text-center text-md md:text-lg text-gray-600">
          Let us guide you from service to success.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
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
                  placeholder="Enter your full name"
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
                  placeholder="Enter your email address, e.g., name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-indigo-500 focus:border-indigo-500"} border-gray-300 rounded-md shadow-sm`}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full ${errors.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-indigo-500 focus:border-indigo-500"} border-gray-300 rounded-md shadow-sm`}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                At least 8 characters, including one number, one uppercase letter, and one lowercase letter.
              </p>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full ${errors.confirmPassword ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-indigo-500 focus:border-indigo-500"} border-gray-300 rounded-md shadow-sm`}
                />
              </div>
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
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
                  placeholder="e.g., Army, Navy, Air Force, Marines, Coast Guard, Space Force"
                  value={branchOfService}
                  onChange={(e) => setBranchOfService(e.target.value)}
                  className={`w-full ${errors.branchOfService ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "focus:ring-indigo-500 focus:border-indigo-500"} border-gray-300 rounded-md shadow-sm`}
                />
              </div>
              {errors.branchOfService && <p className="mt-2 text-sm text-red-600">{errors.branchOfService}</p>}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked: boolean) => setAgreedToTerms(checked)}
                  className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${errors.terms ? "border-red-500" : ""}`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className={`font-medium ${errors.terms ? "text-red-600" : "text-gray-700"}`}>
                  I agree to the <Link href="/terms" className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">Terms & Conditions</Link> and <Link href="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.
                </label>
                {errors.terms && !agreedToTerms && <p className="text-sm text-red-600">{errors.terms}</p>} 
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Account
              </Button>
            </div>
          </form>

           <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
