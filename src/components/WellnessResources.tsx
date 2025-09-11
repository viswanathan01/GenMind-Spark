import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Phone, Video, Users, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const resources = [
  {
    id: "crisis",
    title: "Crisis Support",
    description: "Immediate help when you need it most",
    icon: Phone,
    variant: "urgent" as const,
    actions: [
      { label: "Crisis Text Line", subtitle: "Text HOME to 741741", urgent: true },
      { label: "National Suicide Prevention", subtitle: "988", urgent: true }
    ]
  },
  {
    id: "therapy",
    title: "Professional Support",
    description: "Connect with licensed therapists",
    icon: Video,
    variant: "primary" as const,
    actions: [
      { label: "Find a Therapist", subtitle: "Psychology Today" },
      { label: "Online Therapy", subtitle: "BetterHelp & Talkspace" }
    ]
  },
  {
    id: "community",
    title: "Peer Support",
    description: "Join supportive communities",
    icon: Users,
    variant: "community" as const,
    actions: [
      { label: "Support Groups", subtitle: "NAMI & local groups" },
      { label: "Youth Forums", subtitle: "7 Cups & Teen Line" }
    ]
  },
  {
    id: "education",
    title: "Learn & Grow",
    description: "Educational resources and tools",
    icon: BookOpen,
    variant: "growth" as const,
    actions: [
      { label: "Mental Health 101", subtitle: "Understanding basics" },
      { label: "Coping Strategies", subtitle: "Practical tools" }
    ]
  }
];

export const WellnessResources = () => {
  const { toast } = useToast();

  const handleResourceClick = (action: any, resourceType: string) => {
    if (action.urgent) {
      // For crisis resources, show specific guidance
      toast({
        title: `${action.label} - ${action.subtitle}`,
        description: "Please reach out immediately if you're in crisis. These resources are available 24/7.",
        variant: "destructive",
      });
    } else {
      // For other resources, show supportive message
      toast({
        title: `Connecting to ${action.label}`,
        description: `We're helping you access ${resourceType.toLowerCase()} support. Remember, seeking help is a sign of strength.`,
      });
    }

    // In a real app, you would navigate to the actual resource
    // For now, we'll simulate opening external resources
    setTimeout(() => {
      if (action.label.includes("Crisis Text Line")) {
        window.open("https://www.crisistextline.org/", "_blank");
      } else if (action.label.includes("National Suicide Prevention")) {
        window.open("https://988lifeline.org/", "_blank");
      } else if (action.label.includes("Find a Therapist")) {
        window.open("https://www.psychologytoday.com/us/therapists", "_blank");
      } else if (action.label.includes("Online Therapy") && action.subtitle.includes("BetterHelp")) {
        window.open("https://www.betterhelp.com/", "_blank");
      } else if (action.label.includes("Support Groups")) {
        window.open("https://www.nami.org/Support-Education/Support-Groups", "_blank");
      } else if (action.label.includes("Youth Forums")) {
        window.open("https://www.7cups.com/", "_blank");
      } else {
        // For educational resources, show modal or page
        toast({
          title: "Resource Coming Soon",
          description: "This educational resource will be available in our full platform launch.",
        });
      }
    }, 1500);
  };
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Support Resources</h2>
        <p className="text-muted-foreground">You're not alone. Help is always available.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Card 
              key={resource.id}
              className="bg-card-gradient shadow-gentle transition-smooth hover:shadow-elevated"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className={`
                    p-2 rounded-lg 
                    ${resource.variant === 'urgent' ? 'bg-red-100 text-red-600' :
                      resource.variant === 'primary' ? 'bg-primary/10 text-primary' :
                      resource.variant === 'community' ? 'bg-wellness-comfort/20 text-wellness-comfort' :
                      'bg-wellness-growth/20 text-wellness-growth'
                    }
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground font-normal">{resource.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {resource.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.urgent ? "destructive" : "outline"}
                    className="w-full justify-between h-auto py-3 px-4"
                    onClick={() => handleResourceClick(action, resource.title)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{action.label}</div>
                      <div className="text-xs opacity-80">{action.subtitle}</div>
                    </div>
                    <ExternalLink className="h-4 w-4 flex-shrink-0 ml-2" />
                  </Button>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};