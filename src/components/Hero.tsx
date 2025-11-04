import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, TrendingUp, Award } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Master New Skills with
            <span className="text-primary"> SkillForge</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            Your personalized learning platform for Excel, Finance, PowerPoint, and Video Editing.
            Learn at your own pace with comprehensive, step-by-step guides.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link to="/paths">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">Comprehensive Guides</h3>
            <p className="text-sm text-muted-foreground">
              Detailed, visual step-by-step tutorials for every skill level
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">Progressive Learning</h3>
            <p className="text-sm text-muted-foreground">
              Start as a beginner and advance to expert level
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">Practical Skills</h3>
            <p className="text-sm text-muted-foreground">
              Real-world applications you can use immediately
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
