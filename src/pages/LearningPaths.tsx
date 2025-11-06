import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LearningPathCard from "@/components/LearningPathCard";
import { learningPaths } from "@/data/learningPaths";

const LearningPaths = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8"> {/* Consistent padding with other pages */}
        <div className="container">
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold text-foreground">Learning Paths</h1>
            <p className="text-lg text-muted-foreground">
              Choose from our curated learning paths to build expertise in your chosen field
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {learningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningPaths;
