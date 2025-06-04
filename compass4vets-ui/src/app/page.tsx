"use client"; // Required for potential future client-side interactions like animations and button clicks

import React, { useState } from 'react';
import Link from 'next/link'; // For the Quick Look button
import QuestionnaireOverlay, { FormData } from '@/components/landing/QuestionnaireOverlay'; // Import component and FormData type
import SignUpModal from '@/components/landing/SignUpModal';
import Compass4VetsApp from './Compass4VetsApp'; // Import the dashboard component

// Placeholder for military insignia icons (using a generic star SVG)
const InsigniaIcon = ({ className }: { className?: string }) => (
  <svg 
    className={`w-6 h-6 text-sunset-accent opacity-60 fill-current ${className}`}
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.966-7.417 3.966 1.481-8.279-6.064-5.828 8.332-1.151z"/>
  </svg>
);

// SVG Cloud Component
const Cloud = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
  <svg
    viewBox="0 0 100 60"
    className={`absolute ${className}`}
    style={style}
    fill="rgba(255, 255, 255, 0.8)" // Ivory/White with some transparency
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M25.13,59.63H74.88c13.81,0,25.12-11.31,25.12-25.13S88.69,9.38,74.88,9.38c-1.56,0-3.06.13-4.56.38C66.5,4.38,60.63,0.88,53.63,0.88c-10.25,0-18.75,7.13-20.88,16.63-3.25-2.25-7.13-3.63-11.38-3.63C9.88,13.88,0,23.75,0,36.25S9.88,58.63,21.38,58.63c1.25,0,2.5-.13,3.75-0.25V59.63Z" />
  </svg>
);


export default function HomePage() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [finalQuestionnaireData, setFinalQuestionnaireData] = useState<FormData | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleStartQuestionnaire = () => {
    setIsQuestionnaireOpen(true);
  };

  const handleCloseQuestionnaire = () => {
    setIsQuestionnaireOpen(false);
  };

  const handleSubmitQuestionnaire = (data: FormData) => {
    console.log('Questionnaire Data:', data);
    setFinalQuestionnaireData(data);
    setIsQuestionnaireOpen(false);
    // setIsSignUpModalOpen(true); // Bypass SignUpModal for now
    setShowDashboard(true); // Show the dashboard
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
    setFinalQuestionnaireData(null); // Clear data when modal is fully closed
  };

  const handleBackToQuestionnaire = () => {
    setIsSignUpModalOpen(false);
    // Do not clear finalQuestionnaireData here, as Questionnaire might want to prefill from it
    setIsQuestionnaireOpen(true); // Reopen questionnaire
  };

  const handleQuickLook = () => {
    setShowDashboard(true);
  };

  const handleSignUpComplete = (password: string) => {
    console.log('Sign Up Complete! Password:', password, 'Data:', finalQuestionnaireData);
    // Here you would typically make an API call to create the user account
    alert('Account creation successful! (Placeholder - check console for data). Redirecting...');
    setIsSignUpModalOpen(false);
    setFinalQuestionnaireData(null);
    // Redirect to dashboard or community page, e.g., router.push('/dashboard');
    // For now, just close modal and log.
  };

  if (showDashboard) {
    return <Compass4VetsApp questionnaireData={finalQuestionnaireData} />;
  }
  return (
    <div className="sunset-theme flex flex-col min-h-screen relative overflow-hidden">
      {/* Optional Header for Insignias */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <div className="flex space-x-2">
          <InsigniaIcon />
          <InsigniaIcon />
        </div>
        <div className="flex space-x-2">
          <InsigniaIcon />
          <InsigniaIcon />
        </div>
      </header>

      {/* Main Content Area - Only shown if dashboard is not visible */}
      {/* The following main block will be part of the else condition for !showDashboard */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative z-0">
        {/* Central Animation Area */}
        <div className="relative w-full max-w-md h-64 md:h-80 mb-12 md:mb-16">
          {/* Background for soldier - can be part of the main gradient or a subtle inner glow */}
          <div className="absolute inset-0 flex items-center justify-center">
          </div>
        </div>

        {/* Buttons Area */}
        {(!isQuestionnaireOpen && !isSignUpModalOpen) && (
          <div className="w-full max-w-3xl flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Start Button - Placeholder */}
            <button
              type="button"
              className="button-primary w-full md:w-auto text-xl md:text-2xl px-10 py-5"
              onClick={handleStartQuestionnaire}
            >
              Start Your Journey
            </button>

            {/* Quick Look Button */}
            <button 
              type="button"
              onClick={handleQuickLook}
              className="button-primary w-full md:w-auto text-xl md:text-2xl px-10 py-5"
            >
              Quick Look
            </button>
          </div>
        )}
      </main>

      {/* Optional Footer for Insignias */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center z-10">
        <div className="flex space-x-3">
          <InsigniaIcon className="w-5 h-5" />
          <p className="text-xs text-sunset-text-secondary/70">Compass4Vets - Guiding Service to Success</p>
          <InsigniaIcon className="w-5 h-5" />
        </div>
      </footer>

      {/* Drifting Clouds */}
      <Cloud className="w-24 md:w-32 opacity-60 animate-cloud-drift-1" style={{ top: '15%', animationDuration: 'var(--cloud-1-duration)' }} />
      <Cloud className="w-32 md:w-48 opacity-50 animate-cloud-drift-2" style={{ top: '25%', animationDuration: 'var(--cloud-2-duration)', animationDelay: '5s' }} />
      <Cloud className="w-20 md:w-28 opacity-70 animate-cloud-drift-3" style={{ top: '35%', animationDuration: 'var(--cloud-3-duration)', animationDelay: '10s' }} />
      <Cloud className="w-36 md:w-52 opacity-40 animate-cloud-drift-1" style={{ top: '50%', animationDuration: 'var(--cloud-4-duration)', animationDelay: '15s', transform: 'scaleX(-1)' }} />
      <Cloud className="w-28 md:w-40 opacity-55 animate-cloud-drift-2" style={{ top: '60%', animationDuration: 'var(--cloud-5-duration)', animationDelay: '20s', transform: 'scaleX(-1)' }} />

      <style jsx global>{`
        :root {
          --cloud-1-duration: 70s;
          --cloud-2-duration: 90s;
          --cloud-3-duration: 60s;
          --cloud-4-duration: 100s;
          --cloud-5-duration: 80s;
        }

        @media (max-width: 767px) { /* Screens smaller than md */
          :root {
            --cloud-1-duration: 105s; /* 1.5x slower */
            --cloud-2-duration: 135s;
            --cloud-3-duration: 90s;
            --cloud-4-duration: 150s;
            --cloud-5-duration: 120s;
          }
        }

        /* Cloud Animations */
        @keyframes cloud-drift-1 {
          0% { left: -20%; transform: scaleX(1); }
          100% { left: 120%; transform: scaleX(1); }
        }
        .animate-cloud-drift-1 {
          animation-name: cloud-drift-1;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes cloud-drift-2 {
          0% { right: -20%; transform: scaleX(-1); } /* Start off-screen right, potentially flipped */
          100% { right: 120%; transform: scaleX(-1); }
        }
        .animate-cloud-drift-2 {
          animation-name: cloud-drift-2;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes cloud-drift-3 {
          0% { left: -25%; transform: scaleX(1); }
          50% { left: 60%; transform: scaleX(1.05); } /* Slight variation mid-way */
          100% { left: 125%; transform: scaleX(1); }
        }
        .animate-cloud-drift-3 {
          animation-name: cloud-drift-3;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        /* Soldier Running Animation */
        @keyframes soldier-run {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); } /* Bobbing motion */
        }
        .animate-soldier-run {
          animation: soldier-run 0.7s ease-in-out infinite;
        }
      `}</style>

      <QuestionnaireOverlay 
        isOpen={isQuestionnaireOpen}
        onClose={handleCloseQuestionnaire}
        onSubmit={handleSubmitQuestionnaire}
        initialData={finalQuestionnaireData || {}} // Pass data back if user returns from sign-up
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={handleCloseSignUpModal}
        onBackToQuestionnaire={handleBackToQuestionnaire}
        questionnaireData={finalQuestionnaireData}
        onSignUpComplete={handleSignUpComplete}
      />
    </div>
  );
}

