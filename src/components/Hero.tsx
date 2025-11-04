import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, TrendingUp, Award, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-accent/5 to-background py-20 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(217_91%_60%/0.15),transparent_50%),radial-gradient(circle_at_70%_60%,hsl(36_100%_65%/0.15),transparent_50%)]" />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-scale-in">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Your Learning Journey Starts Here</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-fade-in-up">
            Master New Skills with
            <span className="gradient-text"> SkillForge</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl animate-fade-in-up [animation-delay:0.1s]">
            Your personalized learning platform for Excel, Finance, PowerPoint, and Video Editing.
            Learn at your own pace with comprehensive, step-by-step guides.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up [animation-delay:0.2s]">
            <Button asChild size="lg" className="min-w-[200px] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Link to="/paths">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="group flex flex-col items-center text-center p-6 rounded-lg border bg-card hover-lift hover:border-primary transition-all animate-fade-in-up [animation-delay:0.3s] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 relative z-10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground relative z-10">Comprehensive Guides</h3>
            <p className="text-sm text-muted-foreground relative z-10">
              Detailed, visual step-by-step tutorials for every skill level
            </p>
          </div>
          <div className="group flex flex-col items-center text-center p-6 rounded-lg border bg-card hover-lift hover:border-accent transition-all animate-fade-in-up [animation-delay:0.4s] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 group-hover:scale-110 transition-transform duration-300 relative z-10">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground relative z-10">Progressive Learning</h3>
            <p className="text-sm text-muted-foreground relative z-10">
              Start as a beginner and advance to expert level
            </p>
          </div>
          <div className="group flex flex-col items-center text-center p-6 rounded-lg border bg-card hover-lift hover:border-primary transition-all animate-fade-in-up [animation-delay:0.5s] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform duration-300 relative z-10">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground relative z-10">Practical Skills</h3>
            <p className="text-sm text-muted-foreground relative z-10">
              Real-world applications you can use immediately
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
