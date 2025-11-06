<div class="topic-content">

# Excel Basic Formulas Guide

Formulas are the heartbeat of Excel. They allow you to perform calculations, manipulate text, and analyze data instantly. Whether you're budgeting, tracking sales, or analyzing data, mastering these basics is your first step to Excel proficiency.

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
  <p class="flex items-start">
    <strong class="mr-2">Tip:</strong> All formulas in Excel must start with an equal sign (<code>=</code>). Without it, Excel treats your entry as plain text.
  </p>
</div>

## Arithmetic Operations

Basic arithmetic operations form the foundation of Excel formulas. These operators allow you to perform simple calculations directly in a cell.

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
    <h3 class="text-lg font-semibold mb-2">Addition (+)</h3>
    <p class="mb-1"><strong>Syntax:</strong> <code class="bg-gray-200 px-1 rounded">=A1 + B1</code></p>
    <p class="mb-1"><strong>Example:</strong> <code class="bg-gray-200 px-1 rounded">=5 + 3</code> results in <strong>8</strong></p>
    <p class="text-sm text-gray-600">Use the plus sign to add numbers or cell values together.</p>
  </div>
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
    <h3 class="text-lg font-semibold mb-2">Subtraction (-)</h3>
    <p class="mb-1"><strong>Syntax:</strong> <code class="bg-gray-200 px-1 rounded">=A1 - B1</code></p>
    <p class="mb-1"><strong>Example:</strong> <code class="bg-gray-200 px-1 rounded">=10 - 4</code> results in <strong>6</strong></p>
    <p class="text-sm text-gray-600">Use the minus sign to subtract one number from another.</p>
  </div>
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
    <h3 class="text-lg font-semibold mb-2">Multiplication (*)</h3>
    <p class="mb-1"><strong>Syntax:</strong> <code class="bg-gray-200 px-1 rounded">=A1 * B1</code></p>
    <p class="mb-1"><strong>Example:</strong> <code class="bg-gray-200 px-1 rounded">=6 * 7</code> results in <strong>42</strong></p>
    <p class="text-sm text-gray-600">Use the asterisk to multiply numbers or cell values.</p>
  </div>
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
    <h3 class="text-lg font-semibold mb-2">Division (/)</h3>
    <p class="mb-1"><strong>Syntax:</strong> <code class="bg-gray-200 px-1 rounded">=A1 / B1</code></p>
    <p class="mb-1"><strong>Example:</strong> <code class="bg-gray-200 px-1 rounded">=15 / 3</code> results in <strong>5</strong></p>
    <p class="text-sm text-gray-600">Use the forward slash to divide one number by another.</p>
  </div>
</div>

## Essential Functions

Functions are pre-built formulas in Excel that perform specific calculations. Here are the most commonly used basic functions that you'll use daily.

<div class="space-y-6 my-8 not-prose">
  <div class="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
    <h3 class="text-xl font-semibold mb-3 text-indigo-900">SUM Function</h3>
    <p class="mb-2"><strong>Description:</strong> Adds all the numbers in a range of cells.</p>
    <p class="mb-2"><strong>Syntax:</strong> <code class="bg-indigo-100 px-1 rounded">=SUM(number1, [number2], ...)</code></p>
    <p class="mb-4"><strong>Example:</strong> <code class="bg-indigo-100 px-1 rounded">=SUM(A1:A5)</code> adds the values in cells A1 through A5.</p>
    <div class="bg-white p-4 rounded border border-indigo-100">
      <h4 class="font-semibold mb-2">Example Table:</h4>
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2 text-left">Cell</th>
            <th class="border p-2 text-left">Value</th>
            <th class="border p-2 text-left">Formula Result</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border p-2">A1</td><td class="border p-2">10</td><td class="border p-2" rowspan="5" style="vertical-align: middle;"><code>=SUM(A1:A5)</code><br><strong>Result: 40</strong></td></tr>
          <tr><td class="border p-2">A2</td><td class="border p-2">8</td></tr>
          <tr><td class="border p-2">A3</td><td class="border p-2">12</td></tr>
          <tr><td class="border p-2">A4</td><td class="border p-2">6</td></tr>
          <tr><td class="border p-2">A5</td><td class="border p-2">4</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-green-50 p-6 rounded-lg border border-green-200">
      <h3 class="text-lg font-semibold mb-2 text-green-900">AVERAGE</h3>
      <p class="text-sm mb-2">Returns the arithmetic mean of its arguments.</p>
      <code class="text-xs bg-green-100 px-1 rounded block mb-2">=AVERAGE(B1:B10)</code>
      <p class="text-xs text-green-800"><strong>Use for:</strong> Test scores, sales figures, performance metrics.</p>
    </div>
    <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
      <h3 class="text-lg font-semibold mb-2 text-yellow-900">COUNT</h3>
      <p class="text-sm mb-2">Counts the number of cells that contain numbers.</p>
      <code class="text-xs bg-yellow-100 px-1 rounded block mb-2">=COUNT(C1:C10)</code>
      <p class="text-xs text-yellow-800"><strong>Use for:</strong> Counting entries, items sold, numeric data points.</p>
    </div>
    <div class="bg-red-50 p-6 rounded-lg border border-red-200">
      <h3 class="text-lg font-semibold mb-2 text-red-900">MAX & MIN</h3>
      <p class="text-sm mb-2">Returns the largest (MAX) or smallest (MIN) value.</p>
      <code class="text-xs bg-red-100 px-1 rounded block mb-2">=MAX(D1:D10)</code>
      <p class="text-xs text-red-800"><strong>Use for:</strong> Highest/lowest scores, temperatures, sales peaks.</p>
    </div>
  </div>

  <div class="bg-purple-50 p-6 rounded-lg border border-purple-200">
    <h3 class="text-xl font-semibold mb-3 text-purple-900">IF Function</h3>
    <p class="mb-2"><strong>Description:</strong> Performs a logical test and returns one value if TRUE and another if FALSE.</p>
    <p class="mb-2"><strong>Syntax:</strong> <code class="bg-purple-100 px-1 rounded">=IF(logical_test, value_if_true, value_if_false)</code></p>
    <p><strong>Example:</strong> <code class="bg-purple-100 px-1 rounded">=IF(A1>50, "Pass", "Fail")</code> returns "Pass" if A1 is greater than 50, otherwise "Fail".</p>
  </div>
</div>

## Cell References

Understanding cell references is crucial for creating dynamic and reusable formulas.

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
  <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
    <h3 class="text-lg font-semibold mb-2 text-blue-900">Relative</h3>
    <code class="text-xl block mb-3">A1</code>
    <p class="text-sm">Changes when copied to other cells. This is the default behavior.</p>
  </div>
  <div class="bg-green-50 p-6 rounded-lg border border-green-200">
    <h3 class="text-lg font-semibold mb-2 text-green-900">Absolute</h3>
    <code class="text-xl block mb-3">$A$1</code>
    <p class="text-sm">Locks both the column and row. Does not change when copied.</p>
  </div>
  <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
    <h3 class="text-lg font-semibold mb-2 text-yellow-900">Mixed</h3>
    <code class="text-xl block mb-3">$A1 or A$1</code>
    <p class="text-sm">Locks either the column OR the row, but not both.</p>
  </div>
</div>

## Practical Examples

Here are some real-world examples combining multiple concepts:

<div class="space-y-6 my-8">
  <div class="step-card">
    <h3>1. Sales Summary</h3>
    <p>Create a summary table using SUM, AVERAGE, and MAX functions.</p>
    <pre><code>=SUM(B2:B10)      // Total Sales
=AVERAGE(C2:C10)  // Average Sales per Month
=MAX(B2:B10)      // Highest Sales Month</code></pre>
  </div>
  <div class="step-card">
    <h3>2. Grade Calculator</h3>
    <p>Use the IF function to automatically determine pass/fail status based on a score.</p>
    <pre><code>=IF(D2>=70,"Pass","Fail")        // Check if score in D2 is 70 or above
=IF(AVERAGE(E2:E6)>=85,"A","B")  // Assign grade based on average</code></pre>
  </div>
</div>

</div>