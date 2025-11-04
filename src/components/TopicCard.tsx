import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Topic } from "@/data/topics";
import { Link } from "react-router-dom";

interface TopicCardProps {
  topic: Topic;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400";
    case "Intermediate":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400";
    case "Advanced":
      return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "";
  }
};

const TopicCard = ({ topic }: TopicCardProps) => {
  return (
    <Link to={`/topic/${topic.id}`}>
      <Card className="group h-full transition-all hover:shadow-md hover:border-primary/50">
        <CardHeader>
          <div className="mb-2 flex items-center justify-between">
            <Badge className={getLevelColor(topic.level)}>
              {topic.level}
            </Badge>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {topic.title}
          </CardTitle>
          <CardDescription>{topic.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default TopicCard;
