import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Eye, EyeOff, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState((location.state as any)?.mode !== 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const from = (location.state as any)?.from?.pathname || "/";

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const checkPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8 && pass.length <= 30) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return (score / 5) * 100;
  };

  const getPasswordStrengthLabel = (strength: number) => {
    if (strength === 0) return "Enter a password";
    if (strength <= 40) return "Weak";
    if (strength <= 80) return "Medium";
    return "Strong";
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 40) return "bg-destructive";
    if (strength <= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = e.target.value;
    setPassword(newPass);
    setPasswordStrength(checkPasswordStrength(newPass));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address (e.g., user@example.com).",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          toast({
            title: "Welcome back!",
            description: "You've successfully logged in.",
          });
          navigate(from, { replace: true });
        } else {
          toast({
            title: "Login failed",
            description: result.error,
            variant: "destructive",
          });
        }
      } else {
        if (!username.trim()) {
          toast({
            title: "Username required",
            description: "Please enter a username.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        if (password.length < 8 || password.length > 30) {
          toast({
            title: "Invalid password",
            description: "Password must be between 8 and 30 characters long.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        if (passwordStrength < 60) {
             toast({
               title: "Weak password",
               description: "Please choose a stronger password with numbers and mixed case letters.",
               variant: "destructive",
             });
             setLoading(false);
             return;
        }

        const result = await signup(username, email, password);
        if (result.success) {
          toast({
            title: "Account created!",
            description: "Welcome to SkillForge.",
          });
          navigate(from, { replace: true });
        } else {
          toast({
            title: "Signup failed",
            description: result.error,
            variant: "destructive",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <Card className="w-full max-w-md relative animate-fade-in-up border-border/50 shadow-elegant hover-lift">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full"
          onClick={() => navigate(-1)}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader className="space-y-2 text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-8 w-8 text-primary animate-float" />
            <span className="text-2xl font-bold gradient-text">SkillForge</span>
          </Link>
          <CardTitle className="text-2xl">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your credentials to access your account"
              : "Sign up to start your learning journey"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {!isLogin && password && (
                <div className="space-y-1.5 pt-1">
                  <Progress 
                    value={passwordStrength} 
                    className={`h-1.5 ${getStrengthColor(passwordStrength)}`}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    Strength: <span className="font-medium">{getPasswordStrengthLabel(passwordStrength)}</span>
                  </p>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            {" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setUsername("");
                setEmail("");
                setPassword("");
                setPasswordStrength(0);
              }}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
