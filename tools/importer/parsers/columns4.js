/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row as per the example
  const headerRow = ['Columns (columns4)'];

  // Extract content dynamically from the HTML to ensure flexibility
  const columns = Array.from(element.querySelectorAll(':scope > div')).map((col) => {
    // Handle edge cases: if the column is empty, return a placeholder or empty content
    if (!col || !col.innerHTML.trim()) {
      return document.createTextNode(''); // Empty placeholder
    }
    return col;
  });

  // Create the cells array dynamically based on extracted columns
  const cells = [
    headerRow,
    columns
  ];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}