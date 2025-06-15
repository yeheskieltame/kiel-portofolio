
import React from 'react';
import { Button } from "@/components/ui/button";

interface NamePromptProps {
  visitorName: string;
  setVisitorName: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const NamePrompt: React.FC<NamePromptProps> = ({ visitorName, setVisitorName, onSubmit }) => {
  return (
    <div className="animate-fade-in mb-10 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
      <h3 className="text-xl font-medium mb-3 text-white">Welcome to my digital universe! 🚀</h3>
      <p className="mb-4 text-gray-300">I'd love to know who's exploring. What's your name?</p>
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          placeholder="Enter your name"
        />
        <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-xl px-6 py-3">
          Enter
        </Button>
      </form>
    </div>
  );
};

export default NamePrompt;
