import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { learningPaths } from "@/data/learningPaths";
import { topics } from "@/data/topics";
import { useProgress } from "@/hooks/useProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { progress, getPathProgress } = useProgress();
  
  const completedTopics = topics.filter(t => progress[t.id]);
  const totalTopics = topics.length;
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics.length / totalTopics) * 100) : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-4xl font-bold text-foreground mb-2 gradient-text">Your Learning Dashboard</h1>
            <p className="text-lg text-muted-foreground">Track your progress and continue learning</p>
          </div>

          {/* Overall Progress Card */}
          <Card className="mb-8 border-primary/20 bg-primary/5 hover-lift hover:glow-effect transition-all animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Overall Progress
              </CardTitle>
              <CardDescription>
                You've completed {completedTopics.length} out of {totalTopics} topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={overallProgress} className="h-3" />
                <p className="text-sm font-medium text-right gradient-text">{overallProgress}%</p>
              </div>
            </CardContent>
          </Card>

          {/* Learning Paths Progress */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Learning Paths</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {learningPaths.map((path) => {
                const pathProgress = getPathProgress(path.id, topics);
                return (
                  <Card key={path.id} className="hover-lift hover:border-primary hover:glow-effect transition-all animate-fade-in-up relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">{path.icon}</div>
                          <div>
                            <CardTitle className="group-hover:text-primary transition-colors">{path.name}</CardTitle>
                            <CardDescription className="mt-1">{path.description}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium gradient-text">
                            {pathProgress.completed} / {pathProgress.total} topics
                          </span>
                        </div>
                        <Progress value={pathProgress.percentage} />
                        <p className="text-xs text-right text-muted-foreground">
                          {pathProgress.percentage}% complete
                        </p>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/paths/${path.id}`}>
                          Continue Learning
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recently Completed Topics */}
          {completedTopics.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-success" />
                Recently Completed
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedTopics.slice(-6).reverse().map((topic) => {
                  const path = learningPaths.find(p => p.id === topic.learningPathId);
                  return (
                    <Card key={topic.id} className="hover-lift hover:border-success transition-all animate-scale-in group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader className="relative z-10">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary" className="text-xs group-hover:scale-110 transition-transform">
                            {topic.level}
                          </Badge>
                          <CheckCircle2 className="h-5 w-5 text-success group-hover:scale-110 transition-transform" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-success transition-colors">{topic.title}</CardTitle>
                        <CardDescription className="text-xs">
                          {path?.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <Button asChild variant="ghost" size="sm" className="w-full">
                          <Link to={`/topic/${topic.id}`}>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Review
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {completedTopics.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Start Your Learning Journey</h3>
                <p className="text-muted-foreground mb-4">
                  Complete your first topic to start tracking your progress
                </p>
                <Button asChild>
                  <Link to="/paths">Browse Learning Paths</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
