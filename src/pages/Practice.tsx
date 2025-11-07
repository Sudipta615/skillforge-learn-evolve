import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { quizzes } from "@/data/quizzes";
import { topics } from "@/data/topics";
import { learningPaths } from "@/data/learningPaths";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, Trophy, Target } from "lucide-react";
import Quiz from "@/components/Quiz";
import { useQuizProgress } from "@/hooks/useQuizProgress";

const Practice = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const { getQuizProgress, recordQuizCompletion, getAllCompletedQuizzes, getAverageScore } = useQuizProgress();
  
  const completedQuizzes = getAllCompletedQuizzes();
  const averageScore = getAverageScore();

  const handleQuizComplete = (topicId: string, score: number) => {
    recordQuizCompletion(topicId, score);
    setSelectedQuiz(null);
  };

  if (selectedQuiz) {
    const quiz = quizzes.find(q => q.topicId === selectedQuiz);
    const topic = topics.find(t => t.id === selectedQuiz);
    
    if (!quiz || !topic) return null;

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container max-w-4xl">
            <Button 
              onClick={() => setSelectedQuiz(null)} 
              variant="ghost" 
              className="mb-6"
            >
              ← Back to Practice
            </Button>
            <h1 className="text-3xl font-bold mb-2">{topic.title} Quiz</h1>
            <p className="text-muted-foreground mb-6">{topic.description}</p>
            <Quiz 
              quiz={quiz} 
              onComplete={(score) => handleQuizComplete(selectedQuiz, score)} 
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Brain className="h-10 w-10 text-primary" />
              Practice & Quizzes
            </h1>
            <p className="text-lg text-muted-foreground">Test your knowledge and reinforce your learning</p>
          </div>

          {/* Quiz Stats */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Total Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{quizzes.length}</div>
              </CardContent>
            </Card>
            
            <Card className="border-success/20 bg-success/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedQuizzes.length}</div>
              </CardContent>
            </Card>
            
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{averageScore}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Available Quizzes */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Available Quizzes</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.map((quiz) => {
                const topic = topics.find(t => t.id === quiz.topicId);
                const path = topic ? learningPaths.find(p => p.id === topic.learningPathId) : null;
                const progress = getQuizProgress(quiz.topicId);
                
                if (!topic) return null;

                return (
                  <Card 
                    key={quiz.topicId} 
                    className="hover-lift hover:border-primary transition-all group relative overflow-hidden cursor-pointer"
                    onClick={() => setSelectedQuiz(quiz.topicId)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {topic.level}
                        </Badge>
                        {progress?.completed && (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {topic.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {path?.name} • {quiz.questions.length} questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      {progress?.completed ? (
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">
                            Best Score: <span className="font-semibold text-foreground">{progress.score}%</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Attempts: {progress.attempts}
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            Retake Quiz
                          </Button>
                        </div>
                      ) : (
                        <Button variant="default" size="sm" className="w-full">
                          Start Quiz
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Practice;
