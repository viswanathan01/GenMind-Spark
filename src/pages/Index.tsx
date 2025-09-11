import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodTracker } from "@/components/MoodTracker";
import { AIChat } from "@/components/AIChat";
import { WellnessResources } from "@/components/WellnessResources";
import { Navigation } from "@/components/Navigation";
import { Brain, Heart, Shield, Sparkles, ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/wellness-hero.jpg";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const featuresAnimation = useStaggeredAnimation(3, 150);
  const dashboardAnimation = useScrollAnimation({ threshold: 0.1 });

  const handleLearnMore = () => {
    toast({
      title: "Welcome to GenMind Spark! 🌟",
      description: "Learn about our mission to support youth mental wellness through AI technology and community support.",
    });
    
    // Scroll to features section
    document.querySelector('#features')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
  
  return (
    <div className="min-h-screen bg-background parallax-bg overflow-hidden">
      <Navigation />
      
      {/* Floating decoration elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-wellness-calm/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-wellness-growth/10 rounded-full animate-float-delay-1"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-wellness-energy/10 rounded-full animate-float-delay-2"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-wellness-comfort/10 rounded-full animate-float"></div>
      </div>
      
      {/* Hero Section */}
      <section 
        ref={heroAnimation.ref}
        className={`relative px-4 pt-24 pb-16 sm:px-6 lg:px-8 transition-all duration-1000 z-10 ${
          heroAnimation.isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-hero bg-clip-text text-transparent">
                    AI-Powered
                  </span>{" "}
                  <br />
                  Mental Wellness
                  <br />
                  <span className="text-wellness-growth">for Youth</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  A safe, supportive space where young people can explore their mental health 
                  with AI guidance, peer support, and professional resources.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chat">
                  <Button variant="premium" size="lg" className="group w-full sm:w-auto hover-glow">
                    <Sparkles className="h-4 w-4" />
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button variant="glass" size="lg" onClick={handleLearnMore} className="hover-lift">
                  <Brain className="h-4 w-4" />
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-wellness-growth" />
                  <span className="text-sm font-medium">100% Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-wellness-calm" />
                  <span className="text-sm font-medium">Peer Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-wellness-comfort" />
                  <span className="text-sm font-medium">24/7 Available</span>
                </div>
              </div>
            </div>
            
            <div className={`relative transition-all duration-1000 delay-300 ${
              heroAnimation.isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}>
              <img 
                src={heroImage}
                alt="Mental wellness support illustration"
                className="rounded-2xl shadow-elevated w-full"
              />
              <div className="absolute inset-0 bg-hero opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        ref={featuresAnimation.containerRef}
        className="px-4 py-16 sm:px-6 lg:px-8 bg-secondary/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-800 ${
            featuresAnimation.visibleItems.includes(0) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Wellness Journey Starts Here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combining the power of AI with human compassion to support your mental health
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className={`glass-card shadow-elevated card-hover ${
              featuresAnimation.visibleItems.includes(0) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            } transition-all duration-800`}>
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-hero rounded-xl flex items-center justify-center mb-4 hover-glow shadow-glow">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">AI Wellness Companion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Chat with our AI companion trained specifically for youth mental health. 
                  Get instant support, coping strategies, and personalized guidance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-wellness-calm/10 text-wellness-calm rounded-full text-sm font-medium">24/7 Support</span>
                  <span className="px-3 py-1 bg-wellness-trust/10 text-wellness-trust rounded-full text-sm font-medium">Evidence-Based</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`glass-card shadow-elevated card-hover ${
              featuresAnimation.visibleItems.includes(1) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            } transition-all duration-800 delay-150`}>
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-mood rounded-xl flex items-center justify-center mb-4 hover-glow shadow-glow">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Mood Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Track your daily mood and emotions to identify patterns and triggers. 
                  Our AI provides insights to help you understand your mental health better.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-wellness-growth/10 text-wellness-growth rounded-full text-sm font-medium">Pattern Recognition</span>
                  <span className="px-3 py-1 bg-wellness-energy/10 text-wellness-energy rounded-full text-sm font-medium">Daily Insights</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`glass-card shadow-elevated card-hover ${
              featuresAnimation.visibleItems.includes(2) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            } transition-all duration-800 delay-300`}>
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-premium rounded-xl flex items-center justify-center mb-4 hover-glow shadow-glow">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">Personalized Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Access curated mental health resources, connect with professionals, 
                  and find peer support communities tailored to your needs.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-wellness-comfort/10 text-wellness-comfort rounded-full text-sm font-medium">Professional Network</span>
                  <span className="px-3 py-1 bg-wellness-success/10 text-wellness-success rounded-full text-sm font-medium">Peer Support</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Dashboard */}
      <section 
        ref={dashboardAnimation.ref}
        className="px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-800 ${
            dashboardAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Try Our Wellness Tools
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience how our platform can support your mental health journey
            </p>
          </div>
          
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-200 ${
            dashboardAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="space-y-6">
              <MoodTracker />
              <WellnessResources />
            </div>
            <AIChat />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/20 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">GenMind Spark</h3>
            <p className="text-muted-foreground">
              Empowering young minds through AI-assisted mental wellness
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-wellness-comfort" />
            <span>Made with care for youth mental health</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;