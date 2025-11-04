export interface TopicContent {
  topicId: string;
  content: string;
}

export const topicContents: TopicContent[] = [
  {
    topicId: "excel-macros",
    content: `
<div class="topic-content">
  <h1>The Ultimate Guide to Excel Macros</h1>
  
  <section>
    <h2>What is a Macro?</h2>
    <p>A macro is an action or a set of actions that you can run as many times as you want. When you create a macro, you are recording your mouse clicks and keystrokes. After you create a macro, you can edit it to make minor changes.</p>
    <div class="content-image">
      <img src="https://placehold.co/800x400/4F46E5/FFFFFF?text=Automation+Concept" alt="Macro automation concept illustration" />
    </div>
  </section>

  <section>
    <h2>Why Use Macros?</h2>
    <div class="benefits-grid">
      <div class="benefit-card">
        <h3>⚡ Automation</h3>
        <p>Automate repetitive tasks like formatting reports.</p>
      </div>
      <div class="benefit-card">
        <h3>🚀 Speed</h3>
        <p>Save hours of manual work with a single click.</p>
      </div>
      <div class="benefit-card">
        <h3>✓ Consistency</h3>
        <p>Ensure tasks are performed the exact same way every time.</p>
      </div>
      <div class="benefit-card">
        <h3>🔗 Integration</h3>
        <p>Combine multiple Excel steps into one powerful command.</p>
      </div>
    </div>
  </section>

  <section>
    <h2>Step-by-Step Guide: Your First Macro</h2>
    
    <div class="step-card">
      <h3>Step 1: Enable the Developer Tab</h3>
      <p>The Developer tab isn't visible by default. You need to enable it first.</p>
      <ol>
        <li>Go to <strong>File &gt; Options</strong>.</li>
        <li>In the Excel Options window, click <strong>Customize Ribbon</strong>.</li>
        <li>On the right, check the box for <strong>Developer</strong> and click <strong>OK</strong>.</li>
      </ol>
      <div class="content-image">
        <img src="https://placehold.co/700x450/E5E7EB/1F2937?text=Enable+Developer+Tab" alt="Screenshot showing how to enable the Developer tab in Excel Options" />
      </div>
    </div>

    <div class="step-card">
      <h3>Step 2: Record the Macro</h3>
      <p>Let's record a simple macro that formats a cell with a yellow background and bold text.</p>
      <ol>
        <li>Click on any empty cell (e.g., A1).</li>
        <li>Go to the <strong>Developer</strong> tab and click <strong>Record Macro</strong>.</li>
        <li>Give your macro a name (e.g., <code>FormatYellowBold</code>). You can also assign a shortcut key.</li>
        <li>Click <strong>OK</strong>. Excel is now recording your every move.</li>
        <li>Perform the actions: Fill the cell with a yellow color and make the text <strong>Bold</strong>.</li>
        <li>Go back to the <strong>Developer</strong> tab and click <strong>Stop Recording</strong>.</li>
      </ol>
      <div class="content-image">
        <img src="https://placehold.co/700x400/E5E7EB/1F2937?text=Recording+Macro+Steps" alt="Image sequence showing macro recording steps" />
      </div>
    </div>

    <div class="step-card">
      <h3>Step 3: Run Your Macro</h3>
      <p>The magic happens here.</p>
      <ol>
        <li>Click on any other empty cell (e.g., B2).</li>
        <li>Go to the <strong>Developer</strong> tab and click <strong>Macros</strong>.</li>
        <li>Select <code>FormatYellowBold</code> from the list and click <strong>Run</strong>.</li>
        <li>Cell B2 will instantly be formatted with a yellow background and bold text!</li>
      </ol>
    </div>
  </section>

  <section class="next-steps">
    <h2>What's Next?</h2>
    <p>Now that you've created your first macro, explore the <strong>Visual Basic for Applications (VBA)</strong> editor to see the code Excel wrote for you. This is the first step to writing more powerful, custom macros from scratch.</p>
  </section>
</div>
    `
  }
];

export const getTopicContent = (topicId: string): string => {
  const content = topicContents.find(tc => tc.topicId === topicId);
  return content?.content || `
    <div class="topic-content">
      <h1>Coming Soon</h1>
      <p>This comprehensive guide is currently being prepared. Check back soon for detailed, step-by-step content with visuals and examples.</p>
    </div>
  `;
};
