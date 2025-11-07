import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { topics } from "@/data/topics";
import { learningPaths } from "@/data/learningPaths";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle2, Circle, Bookmark, Brain } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "@/hooks/use-toast";
// New imports for Markdown rendering
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useTopicContent } from "@/hooks/useTopicContent";
import { quizzes } from "@/data/quizzes";
import { useBookmarks } from "@/hooks/useBookmarks";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useStreak } from "@/hooks/useStreak";

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

const TopicDetail = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { isComplete, markComplete, markIncomplete } = useProgress();
  
  // Use our new hook to fetch content dynamically
  const { content, isLoading, error } = useTopicContent(topicId);

  const topic = topics.find(t => t.id === topicId);
  const path = topic ? learningPaths.find(p => p.id === topic.learningPathId) : null;
  const completed = topicId ? isComplete(topicId) : false;
  const hasQuiz = quizzes.find(q => q.topicId === topicId);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = topicId ? isBookmarked(topicId) : false;
  
  const handleToggleBookmark = () => {
      if (!topicId) return;
      toggleBookmark(topicId);
      toast({
          title: bookmarked ? "Bookmark removed" : "Topic bookmarked",
          description: bookmarked ? "Removed from your saved topics." : "Saved for later reading.",
      })
  }

  const handleToggleComplete = () => {
    if (!topicId) return;
    
    if (completed) {
      markIncomplete(topicId);
      toast({
        title: "Progress updated",
        description: "Topic marked as incomplete",
      });
    } else {
      markComplete(topicId);
      toast({
        title: "Congratulations! 🎉",
        description: "Topic marked as complete",
      });
    }
  };

  if (!topic || !path) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
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
      <main className="flex-1 py-8"> {/* Adjusted padding for consistency */}
        <article className="container max-w-4xl">
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/paths">Learning Paths</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/paths/${path.id}`}>{path.name}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{topic.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
          <Button asChild variant="ghost" className="mb-6">
            <Link to={`/paths/${path.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {path.name}
            </Link>
          </Button>

          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <Badge className={`mb-4 ${getLevelColor(topic.level)}`}>
                  {topic.level}
                </Badge>
                <h1 className="mb-4 text-4xl font-bold text-foreground">{topic.title}</h1>
                <p className="text-lg text-muted-foreground">{topic.description}</p>
              </div>
              {/* added Bookmark button */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                    onClick={handleToggleBookmark}
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    title={bookmarked ? "Remove Bookmark" : "Bookmark this topic"}
                >
                    <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-primary text-primary" : ""}`} />
                </Button>
              </div>
              <Button
                onClick={handleToggleComplete}
                variant={completed ? "secondary" : "default"}
                size="lg"
                className="shrink-0"
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle className="mr-2 h-5 w-5" />
                    Mark as Complete
                  </>
                )}
              </Button>
            </div>
          </div>

          {isLoading ? (
            // A simple loading skeleton while the markdown file is fetched
            <div className="space-y-4">
               <Skeleton className="h-8 w-3/4" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-2/3" />
               <div className="grid grid-cols-2 gap-4 mt-8 space-y-4"> {/* Added a grid for better skeleton layout */}
                 <Skeleton className="h-40 w-full" />
                 <Skeleton className="h-40 w-full" />
               </div>
            </div>
          ) : (
            /* ReactMarkdown replaces dangerouslySetInnerHTML. 
               rehypeRaw is vital here: it allows your existing HTML classes 
               (like 'benefit-card') to still work even though it's a .md file.
            */
            <div 
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-0
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-3
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-foreground prose-p:leading-relaxed
                prose-li:text-foreground prose-li:marker:text-primary
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                [&_.content-image]:my-8 [&_.content-image]:flex [&_.content-image]:justify-center
                [&_.content-image_img]:rounded-xl [&_.content-image_img]:shadow-lg [&_.content-image_img]:border [&_.content-image_img]:border-border
                [&_.benefits-grid]:grid [&_.benefits-grid]:grid-cols-1 [&_.benefits-grid]:sm:grid-cols-2 [&_.benefits-grid]:gap-6 [&_.benefits-grid]:my-8 [&_.benefits-grid]:not-prose
                [&_.benefit-card]:p-6 [&_.benefit-card]:rounded-lg [&_.benefit-card]:border [&_.benefit-card]:border-border [&_.benefit-card]:bg-card
                [&_.benefit-card_h3]:text-lg [&_.benefit-card_h3]:font-semibold [&_.benefit-card_h3]:mb-2 [&_.benefit-card_h3]:mt-0 [&_.benefit-card_h3]:text-foreground
                [&_.benefit-card_p]:text-sm [&_.benefit-card_p]:text-muted-foreground [&_.benefit-card_p]:m-0
                [&_.step-card]:my-8 [&_.step-card]:p-8 [&_.step-card]:rounded-xl [&_.step-card]:border [&_.step-card]:border-border [&_.step-card]:bg-muted/30 [&_.step-card]:not-prose
                [&_.step-card_h3]:text-2xl [&_.step-card_h3]:font-bold [&_.step-card_h3]:mb-4 [&_.step-card_h3]:mt-0 [&_.step-card_h3]:text-foreground
                [&_.step-card_p]:text-foreground [&_.step-card_p]:mb-4
                [&_.step-card_ol]:space-y-3 [&_.step-card_ol]:text-foreground
                [&_.step-card_li]:text-foreground
                [&_.next-steps]:mt-12 [&_.next-steps]:p-8 [&_.next-steps]:rounded-xl [&_.next-steps]:border-2 [&_.next-steps]:border-primary/20 [&_.next-steps]:bg-primary/5"
            >
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw, remarkGfm]}
              >
                {content}
              </ReactMarkdown>
              
              {/* Practice Quiz Link */}
              {hasQuiz && (
                <div className="mt-12 p-8 rounded-xl border-2 border-primary/20 bg-primary/5">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Brain className="h-6 w-6 text-primary" />
                    Ready to test your knowledge?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Take the quiz for this topic to reinforce your learning and track your progress.
                  </p>
                  <Button asChild size="lg">
                    <Link to="/practice">
                      <Brain className="h-5 w-5 mr-2" />
                      Go to Practice
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}    
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default TopicDetail;
