"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface RequestServiceModalProps {
  serviceName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestServiceModal({ serviceName, isOpen, onClose }: RequestServiceModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: Replace with real submission logic
    alert(`Request sent for ${serviceName}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background text-foreground rounded-lg w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Request {serviceName}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Textarea placeholder="How can we help?" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Send Request</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
