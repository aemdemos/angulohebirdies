/* global WebImporter */
export default function parse(element, { document }) {
  // Extract immediate child divs
  const sections = [...element.querySelectorAll(':scope > div')];

  // Prepare table rows (header + content rows)
  const headerRow = ['Columns (columns2)'];

  const contentRows = sections.map((section) => {
    const ul = section.querySelector('ul'); // Extract list if exists
    const listItems = ul ? [...ul.children] : [];

    const img = section.querySelector('img'); // Extract image if exists
    const button = section.querySelector('a.button'); // Extract button if exists

    const paragraphText = section.querySelector('p')?.textContent.trim() || '';
    const paragraph = paragraphText ? document.createElement('p') : null;
    if (paragraph) paragraph.textContent = paragraphText;

    return [
      [ul || listItems], // Add list or list items wrapped in an array
      [img || button || paragraph], // Add image, button, or paragraph wrapped in an array
    ];
  });

  // Combine rows into table structure
  const cells = [headerRow, ...contentRows];

  // Create table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}