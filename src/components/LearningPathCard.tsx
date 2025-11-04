import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LearningPath } from "@/data/learningPaths";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface LearningPathCardProps {
  path: LearningPath;
}

const LearningPathCard = ({ path }: LearningPathCardProps) => {
  return (
    <Link to={`/paths/${path.id}`}>
      <Card className="group h-full hover-lift animate-fade-in-up transition-all hover:border-primary hover:glow-effect overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="relative z-10">
          <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${path.color} text-4xl shadow-md group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6`}>
            {path.icon}
          </div>
          <CardTitle className="flex items-center justify-between text-2xl group-hover:text-primary transition-colors">
            {path.name}
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary group-hover:scale-125" />
          </CardTitle>
          <CardDescription className="text-base">{path.description}</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform inline-block">
            Explore Topics →
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LearningPathCard;
