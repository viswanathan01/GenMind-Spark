import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Smile, Meh, Frown, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { id: "great", label: "Great", icon: Heart, color: "text-wellness-energy" },
  { id: "good", label: "Good", icon: Smile, color: "text-wellness-growth" },
  { id: "okay", label: "Okay", icon: Meh, color: "text-wellness-calm" },
  { id: "low", label: "Low", icon: Frown, color: "text-muted-foreground" },
  { id: "energized", label: "Energized", icon: Zap, color: "text-wellness-comfort" }
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleMoodSubmit = () => {
    if (selectedMood) {
      const selectedMoodData = moods.find(mood => mood.id === selectedMood);
      setIsSubmitted(true);
      
      toast({
        title: "Mood logged successfully! 🌟",
        description: `Thank you for sharing that you're feeling ${selectedMoodData?.label.toLowerCase()}. Your emotional awareness is important for your wellbeing.`,
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedMood(null);
      }, 3000);
    }
  };

  return (
    <Card className="bg-card-gradient shadow-gentle transition-smooth hover:shadow-elevated hover-lift">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Heart className="h-5 w-5 text-wellness-comfort animate-pulse-glow" />
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood, index) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`
                  flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover-lift animate-bounce-in
                  ${selectedMood === mood.id 
                    ? 'bg-primary/10 border-2 border-primary animate-pulse-glow' 
                    : 'bg-secondary/50 border-2 border-transparent hover:border-primary/30'
                  }
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className={`h-6 w-6 mb-1 ${mood.color} transition-transform hover:scale-110`} />
                <span className="text-xs font-medium">{mood.label}</span>
              </button>
            );
          })}
        </div>
        
        {selectedMood && (
          <div className="pt-2 animate-bounce-in">
            <Button 
              onClick={handleMoodSubmit}
              variant="wellness"
              className="w-full hover-lift animate-shimmer"
              disabled={isSubmitted}
            >
              {isSubmitted ? "Mood Logged! 🌟" : "Log Mood"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};