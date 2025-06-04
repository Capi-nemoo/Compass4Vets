"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FormData {
  fullName: string;
  emailAddress: string;
  branchOfService: string;
  rankPayGrade: string;
  dateOfDischarge: string; // MM/YYYY
  yearsOfTotalService: string;
  primaryInterests: string;
  specificNeeds: string;
  geographicLocation: string; // City, State
  preferredContactMethod: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}


interface Question {
  id: keyof FormData;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'month';
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

interface QuestionnaireOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

const questions: Question[] = [
  { id: 'fullName', label: 'What is your Full Name (first and last)?', type: 'text', placeholder: 'e.g., John Doe' },
  { id: 'emailAddress', label: 'What is your Email Address?', type: 'email', placeholder: 'e.g., john.doe@example.com' },
  {
    id: 'branchOfService',
    label: 'What is your Branch of Service?',
    type: 'select',
    options: [
      { value: '', label: 'Select Branch...' },
      { value: 'Army', label: 'Army' },
      { value: 'Navy', label: 'Navy' },
      { value: 'Air Force', label: 'Air Force' },
      { value: 'Marine Corps', label: 'Marine Corps' },
      { value: 'Coast Guard', label: 'Coast Guard' },
      { value: 'Space Force', label: 'Space Force' },
      { value: 'Other', label: 'Other' },
    ],
  },
  {
    id: 'rankPayGrade',
    label: 'What is your Rank/Pay Grade level?',
    type: 'select',
    options: [
      { value: '', label: 'Select Level...' },
      { value: 'E', label: 'Enlisted (E-1 to E-9)' },
      { value: 'W', label: 'Warrant Officer (W-1 to W-5)' },
      { value: 'O', label: 'Officer (O-1 to O-10)' },
      { value: 'Unknown', label: 'Prefer not to say / N/A' },
    ],
  },
  { id: 'dateOfDischarge', label: 'What is your Date of Discharge (MM/YYYY)?', type: 'month', placeholder: 'MM/YYYY' },
  { id: 'yearsOfTotalService', label: 'How many Years of Total Service do you have?', type: 'text', placeholder: 'e.g., 4 years, 10.5 years' },
  { id: 'primaryInterests', label: 'What are your Primary Interests?', type: 'textarea', placeholder: 'e.g., Job training, education benefits, housing assistance, mental-health resources', rows: 3 },
  { id: 'specificNeeds', label: 'What are your Specific Needs currently?', type: 'textarea', placeholder: 'e.g., Housing, employment, counseling, peer support', rows: 3 },
  { id: 'geographicLocation', label: 'What is your Geographic Location (City, State)?', type: 'text', placeholder: 'e.g., Austin, TX' },
  {
    id: 'preferredContactMethod',
    label: 'What is your Preferred Contact Method?',
    type: 'select',
    options: [
      { value: '', label: 'Select Method...' },
      { value: 'Email', label: 'Email' },
      { value: 'Phone', label: 'Phone (we will ask for number later if needed)' },
    ],
  },
];

const initialFormData: FormData = {
  fullName: '',
  emailAddress: '',
  branchOfService: '',
  rankPayGrade: '',
  dateOfDischarge: '',
  yearsOfTotalService: '',
  primaryInterests: '',
  specificNeeds: '',
  geographicLocation: '',
  preferredContactMethod: '',
};

export default function QuestionnaireOverlay({ isOpen, onClose, onSubmit, initialData }: QuestionnaireOverlayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState(1); // 1 for next, -1 for back

  useEffect(() => {
    if (isOpen) {
      setFieldErrors({});
      setGeneralError(null); // Clear general errors when modal opens
      setCurrentQuestionIndex(0);
      setFormData(initialData && Object.keys(initialData).length > 0 ? { ...initialFormData, ...initialData } : initialFormData);
      // setError(null); // This was removed as errors are now fieldErrors and generalError
      setSlideDirection(1); 
    }
  }, [isOpen, initialData]);

  const validateField = (fieldId: keyof FormData, value: string): boolean => {
    const newErrors: FormErrors = { ...fieldErrors };
    let fieldIsValid = true;

    if (fieldId === 'fullName') {
      if (!value.trim()) {
        newErrors.fullName = 'Please enter your full name.';
        fieldIsValid = false;
      } else {
        delete newErrors.fullName;
      }
    }

    if (fieldId === 'emailAddress') {
      if (!value.trim()) {
        newErrors.emailAddress = 'Please enter your email address.';
        fieldIsValid = false;
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.emailAddress = 'Please enter a valid email address.';
        fieldIsValid = false;
      } else {
        delete newErrors.emailAddress;
      }
    }

    setFieldErrors(newErrors);
    return fieldIsValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific field error on change
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors(prev => {
        const updatedErrors = { ...prev };
        delete updatedErrors[name as keyof FormData];
        return updatedErrors;
      });
    }
    setGeneralError(null); // Clear general error on any change
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentValue = formData[currentQuestion.id];

    // Specific validation for fullName and emailAddress
    if (currentQuestion.id === 'fullName' || currentQuestion.id === 'emailAddress') {
      if (!validateField(currentQuestion.id, currentValue)) {
        return; // Stop if validation fails (validateField sets fieldErrors)
      }
    }

    // General check for empty fields if not a textarea
    if (currentQuestion.type !== 'textarea' && !currentValue?.trim()) {
      // Only set generalError if no specific fieldError is already set for this field by validateField
      // or if the field is not one that validateField handles (e.g. not fullName or emailAddress)
      if (!fieldErrors[currentQuestion.id] && !(currentQuestion.id === 'fullName' || currentQuestion.id === 'emailAddress')) {
         setGeneralError(`Please answer the current question before proceeding.`);
         return;
      } else if (!fieldErrors[currentQuestion.id] && (currentQuestion.id === 'fullName' || currentQuestion.id === 'emailAddress') && !currentValue?.trim()) {
        // If it's a field handled by validateField but is empty, ensure validateField has set an error, or set a general one.
        // This case should ideally be caught by validateField setting a fieldError.
        // If validateField didn't set an error (e.g. for an empty optional field it doesn't validate),
        // but we still want to enforce an answer here:
        setGeneralError(`Please complete the current field.`);
        return;
      }
    }
    // If we've passed specific validation and the general non-empty check, clear any general error.
    setGeneralError(null);

    if (currentQuestionIndex < questions.length - 1) {
      setGeneralError(null); // Ensure general error is clear before moving to next question
      setSlideDirection(1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Final submit, ensure no general error from this step
      setGeneralError(null);
      onSubmit(formData); // Fallback to original onSubmit if handleSubmitQuestionnaire is not found
      onClose();
    }
  };

  const handleBack = () => {
    setGeneralError(null); // Clear general error when going back
    if (currentQuestionIndex > 0) {
      setSlideDirection(-1); 
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      // If it's a textarea and Shift is pressed, allow default behavior (newline)
      if ((event.target as HTMLElement).tagName === 'TEXTAREA' && event.shiftKey) {
        return;
      }
      // Otherwise, for Enter key (with or without Shift in non-textareas, or Enter alone in textareas)
      event.preventDefault(); // Prevent default form submission or other Enter key behaviors
      handleNext();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  const modalVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "circOut" } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.2, ease: "circIn" } }
  };

  const questionVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30, // Slide from right for next, from left for back
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30, // Slide to left for next, to right for back
      opacity: 0
    })
  };
  
  if (!isOpen && typeof window === 'undefined') { // Keep SSR happy, ensure isOpen is checked client-side for AnimatePresence
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-sunset-overlay-bg flex items-center justify-center z-50 p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <div // This div acts as the non-animated container for the motion.div to prevent layout jumps from padding/margins
            className="bg-sunset-modal-bg p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-lg"
            onClick={(e) => e.stopPropagation()} // Prevent click-through to overlay close
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-2xl md:text-3xl font-bold text-sunset-text-primary">
                Tell Us About Yourself
              </h2>
              <button onClick={onClose} className="text-sunset-text-secondary hover:text-sunset-text-primary text-3xl leading-none">&times;</button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-sunset-text-secondary mb-1">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-sunset-input-bg rounded-full h-2.5">
                <motion.div
                  className="bg-sunset-primary h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                ></motion.div>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="relative h-auto min-h-[150px] sm:min-h-[120px]"> {/* Container to manage height for sliding questions */}
                <AnimatePresence mode="wait" custom={slideDirection} initial={false}>
                  <motion.div
                    key={currentQuestionIndex}
                    custom={slideDirection}
                    variants={questionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 350, damping: 35, duration: 0.4 },
                      opacity: { duration: 0.25 }
                    }}
                    className="absolute w-full" // Position questions absolutely for smooth transition
                  >
                    <label htmlFor={currentQuestion.id} className="block text-lg md:text-xl font-semibold text-sunset-text-primary mb-3 text-center">
                      {currentQuestion.label}
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentQuestionIndex === 0}
                        className="p-3 text-3xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed aspect-square flex items-center justify-center bg-sunset-primary text-white hover:bg-sunset-primary-hover focus:ring-sunset-accent"
                        aria-label="Previous question"
                      >
                        &larr;
                      </button>

                      <div className="flex-grow">
                        {currentQuestion.type === 'select' && currentQuestion.options ? (
                          <select
                            id={currentQuestion.id}
                            name={currentQuestion.id}
                            value={formData[currentQuestion.id]}
                            onChange={handleChange} onKeyDown={handleKeyDown}
                            className="w-full p-3 text-lg border border-sunset-input-border rounded-md focus:ring-sunset-accent focus:border-sunset-accent bg-white text-sunset-text-primary"
                          >
                            {currentQuestion.options.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        ) : currentQuestion.type === 'textarea' ? (
                          <textarea
                            id={currentQuestion.id}
                            name={currentQuestion.id}
                            placeholder={currentQuestion.placeholder}
                            value={formData[currentQuestion.id]}
                            onChange={handleChange} onKeyDown={handleKeyDown}
                            rows={currentQuestion.rows || 3}
                            className="w-full p-3 text-lg border border-sunset-input-border rounded-md focus:ring-sunset-accent focus:border-sunset-accent bg-white text-sunset-text-primary"
                          />
                        ) : currentQuestion.type === 'month' ? (
                          <input
                            type="text"
                            id={currentQuestion.id}
                            name={currentQuestion.id}
                            placeholder={currentQuestion.placeholder} // MM/YYYY
                            value={formData[currentQuestion.id]}
                            onChange={handleChange} onKeyDown={handleKeyDown}
                            maxLength={7} 
                            pattern="(0[1-9]|1[0-2])\/\d{4}" 
                            title="Please enter month and year as MM/YYYY"
                            className="w-full p-3 text-lg border border-sunset-input-border rounded-md focus:ring-sunset-accent focus:border-sunset-accent bg-white text-sunset-text-primary"
                          />
                        ) : (
                          <input
                            type={currentQuestion.type}
                            id={currentQuestion.id}
                            name={currentQuestion.id}
                            placeholder={currentQuestion.placeholder}
                            value={formData[currentQuestion.id]}
                            onChange={handleChange} onKeyDown={handleKeyDown}
                            className="w-full p-3 text-lg border border-sunset-input-border rounded-md focus:ring-sunset-accent focus:border-sunset-accent bg-white text-sunset-text-primary"
                          />
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="p-3 text-3xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed aspect-square flex items-center justify-center bg-sunset-primary text-white hover:bg-sunset-primary-hover focus:ring-sunset-accent"
                        aria-label={currentQuestionIndex === questions.length - 1 ? 'Submit answers' : 'Next question'}
                      >
                        &rarr;
                      </button>
                    </div>
                    {generalError && <p className="mt-4 text-sm text-red-500 text-center">{generalError}</p>}
                    {fieldErrors[currentQuestion.id] && (
                      <p className="mt-2 text-sm text-red-500 text-center">
                        {fieldErrors[currentQuestion.id]}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


