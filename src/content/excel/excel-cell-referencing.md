<div class="topic-content">
  <h1>Understanding Cell Referencing</h1>
  <p>Cell references are addresses in Excel (like A1, B2). Understanding how they behave when you copy formulas is crucial for working efficiently.</p>

  <section>
    <h2>Relative vs. Absolute References</h2>
    <p>By default, Excel uses <strong>Relative</strong> references. When you copy a formula, the reference changes based on where you paste it. Sometimes, you don't want this!</p>
    
    <div class="benefits-grid">
      <div class="benefit-card">
        <h3>Relative (A1)</h3>
        <p>Changes when copied. Good for repeating standard calculations down a column.</p>
      </div>
      <div class="benefit-card">
        <h3>Absolute ($A$1)</h3>
        <p>Stays locked to a specific cell. Use the <code>$</code> sign to lock the column and/or row.</p>
      </div>
    </div>

    <div class="content-image">
        <img src="https://placehold.co/800x450/2563eb/ffffff?text=A1+vs+$A$1" alt="Visual comparison of A1 moving vs $A$1 staying locked" />
    </div>
  </section>

  <div class="step-card">
    <h3>Pro Tip: F4 Shortcut</h3>
    <p>Don't type the dollar signs manually! Click on a cell reference in your formula bar and press <strong>F4</strong> on your keyboard to cycle through different reference types:</p>
    <ul>
      <li>Press once: <code>$A$1</code> (Absolute column & row)</li>
      <li>Press twice: <code>A$1</code> (Relative column, Absolute row)</li>
      <li>Press thrice: <code>$A1</code> (Absolute column, Relative row)</li>
    </ul>
  </div>
</div>