import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Moon, Sun, LayoutDashboard, Flame, Brain } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import UserAvatar from "./UserAvatar";
import { SearchCommand } from "./SearchCommand";
import { useStreak } from "@/hooks/useStreak";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const { streak } = useStreak();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* --- LEFT SECTION: LOGO --- */}
        <div className="mr-4 flex shrink-0 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            {/* Hide text on very small screens if needed, but usually fine to keep */}
            <span className="hidden md:inline-block text-xl font-bold text-foreground">
              SkillForge
            </span>
          </Link>
        </div>

        {/* --- CENTER/LEFT SECTION: SEARCH --- */}
        {/* flex-1 allows it to fill space between logo and nav. mr-4 adds breathing room. */}
        <div className="flex-1 md:flex-none md:mr-4">
           <SearchCommand />
        </div>

        {/* --- RIGHT SECTION: NAVIGATION --- */}
        {/* ml-auto pushes this section to the right. shrink-0 PREVENTS it from disappearing when space is tight. */}
        <div className="ml-auto flex items-center gap-2 shrink-0">
           {/* Streak Display */}
           {isAuthenticated && streak > 0 && (
              <Tooltip>
                  <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 text-orange-500 font-medium px-2 cursor-default">
                          <Flame className="h-5 w-5 fill-orange-500" />
                          <span className="text-sm">{streak}</span>
                      </div>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>{streak} day streak!</p>
                  </TooltipContent>
              </Tooltip>
          )}

           {/* Dashboard Link (hidden on very small mobile to save space) */}
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
            <Link to="/dashboard">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>

          {/* Practice Link */}
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
            <Link to="/practice">
              <Brain className="h-4 w-4 mr-2" />
              Practice
            </Link>
          </Button>
          
          {/* Auth Buttons (only show if NOT authenticated) */}
          {!isAuthenticated ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth" state={{ mode: "login" }}>Sign In</Link>
              </Button>
              <Button asChild variant="default" size="sm" className="hidden sm:flex">
                <Link to="/auth" state={{ mode: "signup" }}>Sign Up</Link>
              </Button>
            </>
          ) : null}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* USER AVATAR - Placed unconditionally at the end of the right section if authenticated */}
          {isAuthenticated && <UserAvatar />}
        </div>
      </div>
    </header>
  );
};

export default Header;