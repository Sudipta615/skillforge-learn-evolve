export interface LearningPath {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const learningPaths: LearningPath[] = [
  {
    id: "excel",
    name: "Excel",
    description: "Master spreadsheet skills from basic formulas to advanced automation with macros and VBA.",
    icon: "📊",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: "finance",
    name: "Finance",
    description: "Learn accounting fundamentals, financial analysis, and corporate finance principles.",
    icon: "💰",
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "powerpoint",
    name: "PowerPoint",
    description: "Create stunning presentations with professional design, animations, and storytelling techniques.",
    icon: "🎨",
    color: "from-orange-500 to-red-600"
  },
  {
    id: "video-editing",
    name: "Video Editing",
    description: "Edit professional videos using PowerDirector 18, from basic cuts to advanced effects.",
    icon: "🎬",
    color: "from-purple-500 to-pink-600"
  }
];
