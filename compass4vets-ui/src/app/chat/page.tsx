"use client";

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Paperclip, SendHorizonal, Settings } from 'lucide-react'; // Added Settings icon
import { chatbotAPI, UserProfile } from '@/services/api'; 
import { useUserProfile } from '@/contexts/UserProfileContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiSettings, setShowApiSettings] = useState(false);
  const { userProfile, isLoading } = useUserProfile();

  // Load API key from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedApiKey = localStorage.getItem('CHATBOT_API_KEY');
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }
    }
  }, []);

  // Save API key and update the API service
  const saveApiKey = () => {
    chatbotAPI.setApiKey(apiKey);
    setShowApiSettings(false);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');

    // Format messages for the API
    const apiMessages = [
      {
        role: 'system', 
        content: 'You are a supportive assistant for veterans. Be respectful and helpful.'
      },
      ...messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      })),
      {
        role: 'user' as const,
        content: newMessage.text
      }
    ];

    try {
      // Show typing indicator
      setMessages(prev => [...prev, {
        id: 'typing',
        text: '...',
        sender: 'ai',
        timestamp: new Date()
      }]);

      // Get response from API
      const response = await chatbotAPI.getChatCompletion(apiMessages, userProfile || undefined);
      
      // Remove typing indicator and add actual response
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== 'typing');
        return [...withoutTyping, {
          id: Date.now().toString(),
          text: response.message.content,
          sender: 'ai',
          timestamp: new Date()
        }];
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Remove typing indicator and add error message
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== 'typing');
        return [...withoutTyping, {
          id: Date.now().toString(),
          text: 'I apologize, but I encountered an error. Please try again later.',
          sender: 'ai',
          timestamp: new Date()
        }];
      });
    }
  };

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  // Add a welcome message when the component first mounts
  useEffect(() => {
    if (messages.length === 0 && !isLoading && userProfile) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: `Hello ${userProfile?.name || 'there'}! I'm your Compass4Vets assistant. How can I help you today?`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length, isLoading, userProfile]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-3xl mx-auto bg-background text-foreground border-x border-border">
      <header className="p-4 border-b border-border flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-primary">AI Chat Assistant</h1>
          <p className="text-sm text-muted-foreground">Ask me anything about veteran resources.</p>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setShowApiSettings(!showApiSettings)}
          title="API Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </header>
      
      {/* API Key Settings Modal */}
      {showApiSettings && (
        <div className="absolute top-20 right-4 bg-card shadow-lg rounded-md p-4 border border-border z-10 w-80">
          <h3 className="text-sm font-medium mb-2">Set API Key</h3>
          <Input 
            type="password" 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="mb-2"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowApiSettings(false)}>Cancel</Button>
            <Button onClick={saveApiKey}>Save</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Your API key is saved locally and never sent to our servers.</p>
        </div>
      )}
      
      {/* User Profile Preview */}
      {userProfile && (
        <div className="bg-accent/30 p-3 border-b border-border">
          <p className="text-xs text-muted-foreground">
            Chatting as: <span className="font-medium">{userProfile.name || 'Anonymous'}</span>
            {userProfile.branch ? ` · ${userProfile.branch}` : ''}
            {userProfile.location ? ` · ${userProfile.location}` : ''}
          </p>
        </div>
      )}

      <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end space-x-2 ${message.sender === 'user' ? 'justify-end' : ''}`}
          >
            {message.sender === 'ai' && (
              <Avatar className="h-8 w-8">
                <AvatarImage src="/ai-avatar.png" alt="AI Avatar" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-xs lg:max-w-md p-3 rounded-lg shadow-sm ${ 
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-card text-card-foreground rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {message.sender === 'user' && (
              <Avatar className="h-8 w-8">
                {userProfile?.name ? (
                  <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                ) : (
                  <AvatarFallback>U</AvatarFallback>
                )}
              </Avatar>
            )}
          </div>
        ))}
        {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-10">
                <p>No messages yet. Start the conversation!</p>
            </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow"
          />
          <Button onClick={handleSendMessage} className="shrink-0">
            <SendHorizonal className="h-5 w-5 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
