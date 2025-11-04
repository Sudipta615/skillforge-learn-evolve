import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">SkillForge</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link 
            to="/paths" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/paths" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Learning Paths
          </Link>
          <Button asChild variant="default" size="sm">
            <Link to="/paths">Start Learning</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
