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
      <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/50">
        <CardHeader>
          <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${path.color} text-4xl shadow-md`}>
            {path.icon}
          </div>
          <CardTitle className="flex items-center justify-between text-2xl">
            {path.name}
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </CardTitle>
          <CardDescription className="text-base">{path.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-primary font-medium">
            Explore Topics →
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LearningPathCard;
