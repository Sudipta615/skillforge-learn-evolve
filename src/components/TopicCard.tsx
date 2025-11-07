import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Topic } from "@/data/topics";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

interface TopicCardProps {
  topic: Topic;
  isCompleted?: boolean;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "Intermediate":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    case "Advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "";
  }
};

const TopicCard = ({ topic, isCompleted = false }: TopicCardProps) => {
  return (
    <Link to={`/topic/${topic.id}`}>
      <Card className="group h-full hover-lift animate-scale-in transition-all hover:border-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="relative z-10">
          <div className="mb-2 flex items-center justify-between">
            <Badge className={`${getLevelColor(topic.level)} transition-colors`}>
              {topic.level}
            </Badge>
            {isCompleted && (
              <CheckCircle2 className="h-5 w-5 text-success" />
            )}
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
            {topic.title}
          </CardTitle>
          <CardDescription className="group-hover:text-foreground/80 transition-colors">{topic.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default TopicCard;
