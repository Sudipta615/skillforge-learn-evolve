export type TopicLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Topic {
  id: string;
  title: string;
  level: TopicLevel;
  learningPathId: string;
  description: string;
}

export const topics: Topic[] = [
  // Excel - Beginner
  { id: "excel-basic-formulas", title: "Basic Formulas", level: "Beginner", learningPathId: "excel", description: "Learn fundamental Excel formulas like SUM, AVERAGE, and COUNT" },
  { id: "excel-cell-referencing", title: "Cell Referencing", level: "Beginner", learningPathId: "excel", description: "Understand relative, absolute, and mixed cell references" },
  { id: "excel-data-formatting", title: "Data Formatting", level: "Beginner", learningPathId: "excel", description: "Format cells, numbers, and dates professionally" },
  { id: "excel-creating-charts", title: "Creating Charts", level: "Beginner", learningPathId: "excel", description: "Visualize data with various chart types" },
  
  // Excel - Intermediate
  { id: "excel-vlookup-hlookup", title: "VLOOKUP & HLOOKUP", level: "Intermediate", learningPathId: "excel", description: "Lookup and retrieve data across spreadsheets" },
  { id: "excel-pivottables", title: "PivotTables", level: "Intermediate", learningPathId: "excel", description: "Analyze and summarize large datasets" },
  { id: "excel-conditional-formatting", title: "Conditional Formatting", level: "Intermediate", learningPathId: "excel", description: "Highlight data based on rules and conditions" },
  { id: "excel-data-validation", title: "Data Validation", level: "Intermediate", learningPathId: "excel", description: "Control data entry with validation rules" },
  
  // Excel - Advanced
  { id: "excel-macros", title: "Macros", level: "Advanced", learningPathId: "excel", description: "Automate repetitive tasks with recorded macros" },
  { id: "excel-power-query", title: "Power Query", level: "Advanced", learningPathId: "excel", description: "Transform and combine data from multiple sources" },
  { id: "excel-vba-basics", title: "VBA Basics", level: "Advanced", learningPathId: "excel", description: "Write custom code to extend Excel functionality" },
  { id: "excel-what-if-analysis", title: "What-If Analysis", level: "Advanced", learningPathId: "excel", description: "Perform scenario and sensitivity analysis" },
  
  // Finance - Beginner
  { id: "finance-journal-entries", title: "Journal Entries", level: "Beginner", learningPathId: "finance", description: "Record business transactions systematically" },
  { id: "finance-ledger-posting", title: "Ledger Posting", level: "Beginner", learningPathId: "finance", description: "Transfer journal entries to ledger accounts" },
  { id: "finance-trial-balance", title: "Trial Balance", level: "Beginner", learningPathId: "finance", description: "Verify the accuracy of ledger accounts" },
  { id: "finance-cash-book", title: "Cash Book", level: "Beginner", learningPathId: "finance", description: "Maintain records of cash transactions" },
  { id: "finance-profit-loss", title: "Profit & Loss Statement", level: "Beginner", learningPathId: "finance", description: "Prepare income statements" },
  { id: "finance-balance-sheet", title: "Balance Sheet", level: "Beginner", learningPathId: "finance", description: "Create statements of financial position" },
  
  // Finance - Intermediate
  { id: "finance-time-value", title: "Time Value of Money", level: "Intermediate", learningPathId: "finance", description: "Calculate present and future values" },
  { id: "finance-capital-budgeting", title: "Capital Budgeting", level: "Intermediate", learningPathId: "finance", description: "Evaluate long-term investment decisions" },
  { id: "finance-risk-return", title: "Risk and Return", level: "Intermediate", learningPathId: "finance", description: "Understand investment risk analysis" },
  { id: "finance-corporate-basics", title: "Corporate Finance Basics", level: "Intermediate", learningPathId: "finance", description: "Learn fundamental corporate finance concepts" },
  
  // Finance - Advanced
  { id: "finance-business-analytics", title: "Business Analytics", level: "Advanced", learningPathId: "finance", description: "Analyze business performance metrics" },
  { id: "finance-valuation", title: "Valuation Methods", level: "Advanced", learningPathId: "finance", description: "Value companies and investments" },
  { id: "finance-capital-structure", title: "Capital Structure", level: "Advanced", learningPathId: "finance", description: "Optimize debt and equity financing" },
  { id: "finance-cost-capital", title: "Cost of Capital", level: "Advanced", learningPathId: "finance", description: "Calculate weighted average cost of capital" },
  { id: "finance-financial-analysis", title: "Financial Statement Analysis", level: "Advanced", learningPathId: "finance", description: "Analyze financial statements comprehensively" },
  { id: "finance-working-capital", title: "Working Capital Management", level: "Advanced", learningPathId: "finance", description: "Manage short-term assets and liabilities" },
  
  // PowerPoint - Beginner
  { id: "ppt-creating-slides", title: "Creating Slides", level: "Beginner", learningPathId: "powerpoint", description: "Build presentation slide decks" },
  { id: "ppt-text-images", title: "Adding Text and Images", level: "Beginner", learningPathId: "powerpoint", description: "Insert and format content" },
  { id: "ppt-templates", title: "Using Templates", level: "Beginner", learningPathId: "powerpoint", description: "Apply professional templates" },
  { id: "ppt-basic-transitions", title: "Basic Transitions", level: "Beginner", learningPathId: "powerpoint", description: "Add smooth slide transitions" },
  
  // PowerPoint - Intermediate
  { id: "ppt-master-slides", title: "Master Slides", level: "Intermediate", learningPathId: "powerpoint", description: "Create consistent layouts" },
  { id: "ppt-embedding-videos", title: "Embedding Videos", level: "Intermediate", learningPathId: "powerpoint", description: "Add multimedia content" },
  { id: "ppt-charts-graphs", title: "Using Charts and Graphs", level: "Intermediate", learningPathId: "powerpoint", description: "Visualize data effectively" },
  { id: "ppt-animation-basics", title: "Animation Basics", level: "Intermediate", learningPathId: "powerpoint", description: "Animate slide elements" },
  
  // PowerPoint - Advanced
  { id: "ppt-animation-paths", title: "Advanced Animation Paths", level: "Advanced", learningPathId: "powerpoint", description: "Create complex motion paths" },
  { id: "ppt-custom-templates", title: "Creating Custom Templates", level: "Advanced", learningPathId: "powerpoint", description: "Design branded templates" },
  { id: "ppt-presenter-view", title: "Presenter View & Tips", level: "Advanced", learningPathId: "powerpoint", description: "Master presentation delivery" },
  { id: "ppt-collaboration", title: "Collaboration Features", level: "Advanced", learningPathId: "powerpoint", description: "Work with teams on presentations" },
  
  // Video Editing - Beginner
  { id: "video-importing-media", title: "Importing Media", level: "Beginner", learningPathId: "video-editing", description: "Import video and audio files" },
  { id: "video-basic-cuts", title: "Basic Cuts & Trimming", level: "Beginner", learningPathId: "video-editing", description: "Edit video timeline" },
  { id: "video-adding-titles", title: "Adding Titles", level: "Beginner", learningPathId: "video-editing", description: "Create text overlays" },
  { id: "video-exporting", title: "Exporting a Video", level: "Beginner", learningPathId: "video-editing", description: "Render final videos" },
  
  // Video Editing - Intermediate
  { id: "video-color-correction", title: "Color Correction", level: "Intermediate", learningPathId: "video-editing", description: "Adjust colors and exposure" },
  { id: "video-audio-music", title: "Adding Audio & Music", level: "Intermediate", learningPathId: "video-editing", description: "Mix audio tracks" },
  { id: "video-transitions", title: "Using Transitions Effectively", level: "Intermediate", learningPathId: "video-editing", description: "Create smooth scene changes" },
  { id: "video-keyframing", title: "Keyframing Basics", level: "Intermediate", learningPathId: "video-editing", description: "Animate properties over time" },
  
  // Video Editing - Advanced
  { id: "video-motion-tracking", title: "Motion Tracking", level: "Advanced", learningPathId: "video-editing", description: "Track moving objects" },
  { id: "video-green-screen", title: "Green Screen Editing", level: "Advanced", learningPathId: "video-editing", description: "Composite chroma key footage" },
  { id: "video-multi-cam", title: "Multi-cam Editing", level: "Advanced", learningPathId: "video-editing", description: "Edit multiple camera angles" },
  { id: "video-advanced-titling", title: "Advanced Titling and Effects", level: "Advanced", learningPathId: "video-editing", description: "Create professional graphics" }
];
