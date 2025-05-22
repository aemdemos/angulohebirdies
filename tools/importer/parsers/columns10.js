/* global WebImporter */

export default function parse(element, { document }) {
  // Header Row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Define cells for the table
  const cells = [headerRow];

  // Extracting all child divs of the main block
  const children = Array.from(element.querySelectorAll(':scope > div:not(.carousel-buttons)'));

  children.forEach((child) => {
    const images = Array.from(child.querySelectorAll('picture')); // Extract <picture> tags
    const textContent = child.textContent.trim(); // Extract text content

    // Combine images and text into a single cell
    const cellContent = [];
    if (images.length) {
      cellContent.push(...images);
    }
    if (textContent) {
      const textElement = document.createElement('div');
      textElement.textContent = textContent;
      cellContent.push(textElement);
    }

    // Add the cell content as a row
    cells.push([cellContent]);
  });

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(tableBlock);
}