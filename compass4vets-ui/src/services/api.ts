"use client";

/**
 * API service for handling chatbot functionality
 * The API key should be stored securely in .env.local file:
 * NEXT_PUBLIC_CHATBOT_API_KEY=your_api_key_here
 */

// Initialize API key if not present
if (typeof window !== 'undefined' && !localStorage.getItem('CHATBOT_API_KEY')) {
  localStorage.setItem('CHATBOT_API_KEY', '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');
}

// Use the stored API key
const API_KEY = typeof window !== 'undefined' 
  ? localStorage.getItem('CHATBOT_API_KEY') || 'default_key_for_development'
  : 'default_key_for_development';

interface ChatCompletionRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  userProfile?: UserProfile;
}

export interface UserProfile {
  id?: string;
  name?: string;
  age?: number;
  branch?: string;
  serviceYears?: number; 
  location?: string;
  interests?: string[];
  medicalConditions?: string[];
  [key: string]: any; // Allow for additional properties
}

export class ChatbotAPI {
  private apiKey: string;
  
  constructor(apiKey: string = API_KEY) {
    this.apiKey = apiKey;
  }

  /**
   * Set the API key for the chatbot
   * @param apiKey - The API key to use for requests
   */
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    // Store in localStorage for persistence
    localStorage.setItem('CHATBOT_API_KEY', apiKey);
  }

  /**
   * Get a completion from the chatbot
   * @param messages - Array of message objects with role and content
   * @param userProfile - Optional user profile to personalize responses
   */
  async getChatCompletion(messages: ChatCompletionRequest['messages'], userProfile?: UserProfile) {
    try {
      // Add a system message with user profile context if available
      let systemMessages = [];
      
      // Add general instruction for tone and purpose
      systemMessages.push({
        role: 'system' as const,
        content: 'You are a supportive assistant for military veterans. Use a respectful, encouraging tone. Your purpose is to provide helpful information about veteran resources and support. Respond concisely and directly to questions.'
      });
      
      // Add user profile context if available
      if (userProfile) {
        const { name, age, branch, serviceYears, location, interests, medicalConditions } = userProfile;
        let profileContext = `User profile: ${name || 'Veteran'}`;
        if (age) profileContext += `, ${age} years old`;
        if (branch) profileContext += `, served in ${branch}`;
        if (serviceYears) profileContext += ` for ${serviceYears} years`;
        if (location) profileContext += `, located in ${location}`;
        if (interests?.length) profileContext += `, interests include ${interests.join(', ')}`;
        if (medicalConditions?.length) profileContext += `, has mentioned ${medicalConditions.join(', ')}`;
        
        systemMessages.push({
          role: 'system' as const,
          content: profileContext
        });
      }
      
      // Format messages for OpenAI API
      const formattedMessages = [
        ...systemMessages,
        ...messages.filter(msg => msg.role !== 'system') // Skip any system messages already in the conversation
      ];
      
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: formattedMessages,
          max_tokens: 500,
          temperature: 0.7
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        message: {
          role: 'assistant',
          content: data.choices[0].message.content
        }
      };
    } catch (error) {
      console.error('Error getting chat completion:', error);
      return { 
        error: 'Failed to get response from chatbot service.',
        message: {
          role: 'assistant',
          content: 'I apologize, but Im having trouble connecting to my services right now. Please try again later.'
        }
      };
    }
  }
}

// Export a singleton instance
export const chatbotAPI = new ChatbotAPI();
