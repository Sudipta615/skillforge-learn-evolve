import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicCard from "@/components/TopicCard";
import { topics } from "@/data/topics";
import { learningPaths } from "@/data/learningPaths";
import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const TopicGrid = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const { isComplete } = useProgress();
  const path = learningPaths.find(p => p.id === pathId);
  const pathTopics = topics.filter(t => t.learningPathId === pathId);
  
  const beginnerTopics = pathTopics.filter(t => t.level === "Beginner");
  const intermediateTopics = pathTopics.filter(t => t.level === "Intermediate");
  const advancedTopics = pathTopics.filter(t => t.level === "Advanced");

  if (!path) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Learning Path Not Found</h1>
            <Button asChild>
              <Link to="/paths">Back to Learning Paths</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8"> {/* Consistent padding with other pages */}
        <div className="container">
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/paths">Learning Paths</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{path.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/paths">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learning Paths
            </Link>
          </Button>

          <div className="mb-8">
            <div className={`mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${path.color} text-5xl shadow-lg`}>
              {path.icon}
            </div>
            <h1 className="mb-4 text-4xl font-bold text-foreground">{path.name}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{path.description}</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Topics</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-12">
                {beginnerTopics.length > 0 && (
                  <div>
                    <h2 className="mb-6 text-2xl font-bold text-foreground">Beginner</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {beginnerTopics.map(topic => (
                        <TopicCard key={topic.id} topic={topic} isCompleted={isComplete(topic.id)} />
                      ))}
                    </div>
                  </div>
                )}
                
                {intermediateTopics.length > 0 && (
                  <div>
                    <h2 className="mb-6 text-2xl font-bold text-foreground">Intermediate</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {intermediateTopics.map(topic => (
                        <TopicCard key={topic.id} topic={topic} isCompleted={isComplete(topic.id)} />
                      ))}
                    </div>
                  </div>
                )}
                
                {advancedTopics.length > 0 && (
                  <div>
                    <h2 className="mb-6 text-2xl font-bold text-foreground">Advanced</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {advancedTopics.map(topic => (
                        <TopicCard key={topic.id} topic={topic} isCompleted={isComplete(topic.id)} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="beginner" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {beginnerTopics.map(topic => (
                  <TopicCard key={topic.id} topic={topic} isCompleted={isComplete(topic.id)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="intermediate" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {intermediateTopics.map(topic => (
                  <TopicCard key={topic.id} topic={topic} isCompleted={isComplete(topic.id)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {advancedTopics.map(topic => (
                  <TopicCard key={topic.id} topic={topic} isCompleted={isComplete(topic.id)} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopicGrid;
