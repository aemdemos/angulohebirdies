/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row matches the example markdown structure
  const headerRow = ['Columns (columns5)'];

  // Extract all columns from the provided element dynamically
  const rows = Array.from(element.querySelectorAll(':scope > div')).map(col => {
    // Extract the picture element
    const picture = col.querySelector('picture');
    const img = picture ? picture.querySelector('img') : null;

    // Handle missing picture edge case
    const imageElement = img ? picture : document.createElement('div');
    if (!img) imageElement.textContent = 'No Image Available';

    // Extract the content (text description and links) element
    const contentDiv = col.querySelector('div:nth-of-type(2)');

    // Handle missing content edge case
    const contentElement = contentDiv ? contentDiv : document.createElement('div');
    if (!contentDiv) contentElement.textContent = 'No Content Available';

    // Return array for this column
    return [imageElement, contentElement];
  });

  // Create table array dynamically
  const cells = [headerRow, ...rows];

  // Generate the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured table
  element.replaceWith(table);
}