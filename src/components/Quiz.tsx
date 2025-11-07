import { useState } from "react";
import { Quiz as QuizType } from "@/data/quizzes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizProps {
  quiz: QuizType;
  onComplete?: (score: number) => void;
}

const Quiz = ({ quiz, onComplete }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setIsAnswerChecked(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      const percentage = Math.round((score / quiz.questions.length) * 100);
      setQuizCompleted(true);
      if (onComplete) onComplete(percentage);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <Card className="mt-12 border-2 border-primary/20 animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
             <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-muted stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-primary stroke-current transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                transform="rotate(-90 50 50)"
              ></circle>
            </svg>
            <span className="absolute text-3xl font-bold">{percentage}%</span>
          </div>
          <p className="text-lg text-muted-foreground mb-2">
            You scored {score} out of {quiz.questions.length}
          </p>
          {percentage >= 70 ? (
              <p className="text-green-500 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Great job! You've mastered this topic.
              </p>
          ) : (
              <p className="text-yellow-500 font-medium flex items-center gap-2">
                  Keep practicing! Review the topic and try again.
              </p>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={handleRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" /> Retry Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="mt-12 animate-fade-in-up">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
             <CardTitle>Knowledge Check</CardTitle>
             <span className="text-sm text-muted-foreground">
                 Question {currentQuestionIndex + 1} of {quiz.questions.length}
             </span>
        </div>
        <Progress value={((currentQuestionIndex) / quiz.questions.length) * 100} className="h-2" />
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(val) => setSelectedAnswer(parseInt(val))}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, index) => {
            let itemClasses = "flex items-center space-x-3 space-y-0 rounded-md border p-4 transition-colors cursor-pointer hover:bg-muted/50";
            
            if (isAnswerChecked) {
              if (index === currentQuestion.correctAnswer) {
                 itemClasses += " border-green-500 bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/50";
              } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                 itemClasses += " border-red-500 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50";
              } else {
                 itemClasses += " opacity-50";
              }
            }

             return (
                <div key={index} className={itemClasses} onClick={() => !isAnswerChecked && setSelectedAnswer(index)}>
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isAnswerChecked} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-normal">
                        {option}
                    </Label>
                    {isAnswerChecked && index === currentQuestion.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    )}
                    {isAnswerChecked && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                </div>
            );
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        {!isAnswerChecked ? (
          <Button 
            onClick={handleCheckAnswer} 
            className="w-full sm:w-auto" 
            disabled={selectedAnswer === null}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="w-full sm:w-auto">
            {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Quiz;