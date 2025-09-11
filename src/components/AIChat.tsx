import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm here to listen and support you. How are you feeling today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Wellness-focused responses based on keywords and sentiment
    if (input.includes('anxious') || input.includes('anxiety') || input.includes('worried')) {
      const anxietyResponses = [
        "I hear that you're feeling anxious. Anxiety can be overwhelming, but remember that it's temporary. Have you tried any breathing exercises or grounding techniques?",
        "Anxiety is challenging, and I'm glad you're sharing this with me. What usually helps you feel more grounded when anxiety arises?",
        "Thank you for trusting me with your anxiety. Let's focus on what you can control right now. What's one small thing that might bring you comfort?"
      ];
      return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
    }
    
    if (input.includes('sad') || input.includes('depressed') || input.includes('down') || input.includes('low')) {
      const sadnessResponses = [
        "I'm sorry you're feeling this way. Your feelings are valid, and it's brave of you to express them. What's been weighing on your heart lately?",
        "Sadness can feel heavy, but sharing it can help lighten the load. I'm here to listen. What would support look like for you right now?",
        "Thank you for being open about feeling down. Sometimes just acknowledging these feelings is the first step. What's one thing you're grateful for today?"
      ];
      return sadnessResponses[Math.floor(Math.random() * sadnessResponses.length)];
    }
    
    if (input.includes('stress') || input.includes('overwhelmed') || input.includes('pressure')) {
      const stressResponses = [
        "Stress can make everything feel more difficult. You're not alone in feeling this way. What's the biggest source of stress for you right now?",
        "Being overwhelmed is exhausting. Let's break things down together. What's one small step you could take today to feel more in control?",
        "I hear that you're under pressure. Remember, you don't have to handle everything at once. What support do you have available to you?"
      ];
      return stressResponses[Math.floor(Math.random() * stressResponses.length)];
    }
    
    if (input.includes('happy') || input.includes('good') || input.includes('great') || input.includes('better')) {
      const positiveResponses = [
        "I'm so glad to hear you're feeling good! It's wonderful when we can recognize and celebrate positive moments. What's contributing to this feeling?",
        "That's fantastic! It's important to acknowledge when we're doing well. What's been going right in your life lately?",
        "Your positive energy is uplifting! What strategies or activities have been helping you feel this way?"
      ];
      return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }
    
    if (input.includes('help') || input.includes('support') || input.includes('advice')) {
      const helpResponses = [
        "I'm here to support you. While I can listen and offer gentle guidance, remember that professional help is always available if you need it. What kind of support feels most helpful to you?",
        "Asking for help takes strength. I'm glad you reached out. What specific area of your life would you like to focus on together?",
        "Support comes in many forms, and I'm honored to be part of your support network. What's been your biggest challenge lately?"
      ];
      return helpResponses[Math.floor(Math.random() * helpResponses.length)];
    }
    
    if (input.includes('sleep') || input.includes('tired') || input.includes('exhausted')) {
      const sleepResponses = [
        "Sleep is so important for our mental wellbeing. How have your sleep patterns been lately? Sometimes establishing a calming bedtime routine can help.",
        "Being tired can affect everything - your mood, your thinking, your energy. What's been interfering with your rest?",
        "Exhaustion can be both physical and emotional. Have you been giving yourself permission to rest and recharge?"
      ];
      return sleepResponses[Math.floor(Math.random() * sleepResponses.length)];
    }
    
    // Default empathetic responses
    const defaultResponses = [
      "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what's been on your mind?",
      "I appreciate you opening up. Your experiences and feelings matter. What would you like to explore together?",
      "It sounds like you have a lot going on. I'm glad you're taking the time to check in with yourself. How can I best support you right now?",
      "I hear you, and I want you to know that your feelings are valid. What's been the most challenging part of your day?",
      "Thank you for trusting me with your thoughts. Sometimes just talking can help us process things. What else is on your mind?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate more realistic typing delay based on response length
    const response = generateAIResponse(currentInput);
    const typingDelay = Math.min(Math.max(response.length * 30, 1500), 4000);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="bg-card-gradient shadow-gentle h-96 flex flex-col hover-lift">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Bot className="h-5 w-5 text-primary animate-pulse-glow" />
          <span className="animate-gradient bg-gradient-to-r from-primary to-wellness-growth bg-clip-text text-transparent">
            AI Wellness Companion
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-3">
        <ScrollArea className="flex-1 pr-3">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isBot ? '' : 'justify-end'} animate-bounce-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.isBot && (
                  <Bot className="h-6 w-6 text-primary mt-1 flex-shrink-0 animate-pulse-glow" />
                )}
                <div
                  className={`
                    max-w-[80%] px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105
                    ${message.isBot 
                      ? 'bg-secondary text-secondary-foreground' 
                      : 'bg-primary text-primary-foreground ml-auto'
                    }
                  `}
                >
                  {message.content}
                </div>
                {!message.isBot && (
                  <User className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 animate-bounce-in">
                <Bot className="h-6 w-6 text-primary mt-1 flex-shrink-0 animate-pulse-glow" />
                <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1 transition-all duration-300 focus:scale-105"
          />
          <Button 
            onClick={handleSendMessage}
            variant="wellness"
            size="icon"
            disabled={!inputValue.trim() || isTyping}
            className="hover-lift animate-pulse-glow"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};