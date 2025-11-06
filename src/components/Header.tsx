import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Moon, Sun, LayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">SkillForge</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/dashboard">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          
          {!isAuthenticated ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to="/auth" state={{ mode: "login" }}>Sign In</Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link to="/auth" state={{ mode: "signup" }}>Sign Up</Link>
              </Button>
            </>
          ) : null}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isAuthenticated && <UserAvatar />}
        </nav>
      </div>
    </header>
  );
};

export default Header;