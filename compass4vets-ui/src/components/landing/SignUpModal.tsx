"use client";

import React, { useState, useEffect } from 'react';
import type { FormData } from './QuestionnaireOverlay'; // Import the FormData type

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToQuestionnaire: () => void;
  questionnaireData: FormData | null;
  onSignUpComplete: (password: string) => void;
}

export default function SignUpModal({ 
  isOpen, 
  onClose, 
  onBackToQuestionnaire, 
  questionnaireData, 
  onSignUpComplete 
}: SignUpModalProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen || !questionnaireData) {
    return null;
  }

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSignUp = () => {
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) { // Example: Basic password length validation
        setError('Password must be at least 8 characters long.');
        return;
    }
    setError(null);
    onSignUpComplete(password);
  };

  // Create a display-friendly list of questionnaire data
  const summaryItems = questionnaireData ? Object.entries(questionnaireData).map(([key, value]) => {
    // Convert camelCase key to Title Case for display
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    return { label, value: value || '(Not provided)' };
  }) : [];

  return (
    <div className="fixed inset-0 bg-sunset-overlay-bg flex items-center justify-center z-[60] p-4">
      <div className="bg-sunset-modal-bg p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-sunset-text-primary">
            Finalize Your Account
          </h2>
          <button onClick={onClose} className="text-sunset-text-secondary hover:text-sunset-text-primary text-2xl">&times;</button>
        </div>

        <div className="mb-6 border-b border-sunset-input-border pb-4">
          <h3 className="text-lg font-semibold text-sunset-text-primary mb-2">Your Information Summary:</h3>
          <ul className="space-y-1 text-sm text-sunset-text-secondary">
            {summaryItems.map(item => (
              <li key={item.label}><strong>{item.label}:</strong> {item.value}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }} className="space-y-4">
          <div>
            <label htmlFor="passwordModal" className="block text-sm font-medium text-sunset-text-primary mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                id="passwordModal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-base"
                placeholder="Create a password (min. 8 characters)"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-sunset-text-secondary hover:text-sunset-primary"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPasswordModal" className="block text-sm font-medium text-sunset-text-primary mb-1">Confirm Password</label>
            <input 
              type={showPassword ? 'text' : 'password'}
              id="confirmPasswordModal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 text-base"
              placeholder="Confirm your password"
            />
          </div>
          
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!error && password && confirmPassword && !passwordsMatch && <p className="text-sm text-red-600">Passwords do not match.</p>}

          <div className="pt-4 space-y-3">
            <button 
              type="submit"
              disabled={!passwordsMatch || password.length < 8}
              className="button-primary w-full py-3 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Complete Sign Up
            </button>
            <button 
              type="button"
              onClick={onBackToQuestionnaire}
              className="w-full text-center text-sm text-sunset-text-secondary hover:text-sunset-primary hover:underline"
            >
              Back to Questionnaire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
