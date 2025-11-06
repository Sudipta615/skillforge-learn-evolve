import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowDialog(true);
    }
  }, [isAuthenticated]);

  const handleNavigateToAuth = () => {
    setShowDialog(false);
    navigate("/auth", { state: { from: location } });
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-12 w-12 text-primary animate-float" />
            </div>
            <DialogTitle className="text-center text-2xl">Authentication Required</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Please sign in or create an account to access this content and track your progress.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button onClick={handleNavigateToAuth} className="w-full">
              Sign In / Sign Up
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowDialog(false);
                navigate("/");
              }}
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
