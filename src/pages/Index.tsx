import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LearningPathCard from "@/components/LearningPathCard";
import { learningPaths } from "@/data/learningPaths";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 bg-background">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">Choose Your Learning Path</h2>
              <p className="text-lg text-muted-foreground">
                Select a path below to explore topics and start your learning journey
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {learningPaths.map((path) => (
                <LearningPathCard key={path.id} path={path} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
