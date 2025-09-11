import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Sparkles className="h-7 w-7 text-primary transition-transform group-hover:rotate-12 group-hover:scale-110" />
              <div className="absolute inset-0 animate-pulse-glow opacity-50">
                <Sparkles className="h-7 w-7 text-primary-glow" />
              </div>
            </div>
            <span className="text-xl font-bold bg-hero bg-clip-text text-transparent">
              GenMind Spark
            </span>
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-4">
            <Link to="/chat">
              <Button variant="premium" size="sm" className="hover-glow">
                <Sparkles className="h-4 w-4" />
                AI Chat
              </Button>
            </Link>
            <ThemeToggle />

            {/* Clerk Auth */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};
