import { useState, useEffect } from 'react';

// 1. Tell Vite to find ALL .md files in ANY subfolder of ../content
// { query: '?raw' } forces it to load as text, not as executable JS.
// { import: 'default' } is a helper to just get the raw string content directly.
const markdownFiles = import.meta.glob('../content/**/*.md', { 
  query: '?raw', 
  import: 'default' 
});

export const useTopicContent = (topicId: string | undefined) => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (!topicId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(false);

      try {
        // 2. Find the file path that ends with our topicId.md
        // keys of markdownFiles look like: "../content/excel/excel-macros.md"
        const filePath = Object.keys(markdownFiles).find((path) => 
          path.endsWith(`/${topicId}.md`)
        );

        if (!filePath) {
          throw new Error(`File not found for topic: ${topicId}`);
        }

        // 3. Call the importer function for that specific file
        const fileContent = await markdownFiles[filePath]() as string;
        setContent(fileContent);

      } catch (err) {
        console.error(`Error loading topic content for ${topicId}:`, err);
        setError(true);
        setContent(`
<div class="topic-content">
  <h1>Coming Soon</h1>
  <p>This comprehensive guide is currently being prepared. Check back soon!</p>
</div>
        `);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [topicId]);

  return { content, isLoading, error };
};