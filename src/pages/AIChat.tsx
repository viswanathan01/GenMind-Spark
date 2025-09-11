import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bot, Send, User, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to your wellness journey! I'm here to provide personalized support for your mental health. What's on your mind today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with more contextual replies
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. It's completely normal to have ups and downs. Can you tell me more about what's been challenging for you lately?",
        "Thank you for sharing that with me. Your feelings are valid, and I'm here to support you through this. What coping strategies have you tried before?",
        "That sounds difficult to deal with. Remember that seeking help is a sign of strength, not weakness. How can I best support you right now?",
        "I hear you, and I want you to know that you're not alone in this. Many young people face similar challenges. What would feel most helpful to talk about today?",
        "Your mental health matters, and I'm glad you're taking steps to prioritize it. What are some things that usually help you feel better when you're struggling?"
      ];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card-gradient">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">GenMind Spark AI</h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="h-[calc(100vh-200px)] flex flex-col bg-card-gradient shadow-elevated">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Bot className="h-6 w-6 text-primary" />
              Your AI Wellness Companion
            </CardTitle>
            <p className="text-muted-foreground">
              A safe space to share your thoughts and get personalized mental health support
            </p>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-6">
            <ScrollArea className="flex-1 pr-4 mb-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isBot ? '' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 bg-wellness-calm/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-wellness-calm" />
                      </div>
                    )}
                    <div
                      className={`
                        max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                        ${message.isBot 
                          ? 'bg-secondary/80 text-secondary-foreground' 
                          : 'bg-primary text-primary-foreground ml-auto'
                        }
                      `}
                    >
                      {message.content}
                      <div className={`text-xs opacity-60 mt-1 ${message.isBot ? 'text-left' : 'text-right'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 bg-wellness-growth/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-wellness-growth" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-wellness-calm/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-wellness-calm" />
                    </div>
                    <div className="bg-secondary/80 text-secondary-foreground px-4 py-3 rounded-2xl">
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
            
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind... I'm here to listen and support you."
                className="flex-1 text-base py-3"
              />
              <Button 
                onClick={handleSendMessage}
                variant="wellness"
                size="lg"
                disabled={!inputValue.trim() || isTyping}
                className="px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-3 text-xs text-muted-foreground text-center">
              This AI companion is designed to provide general wellness support. For crisis situations, please contact emergency services or a mental health professional.
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AIChatPage;