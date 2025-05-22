/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns5)'];

  // Collect immediate children of the element for processing
  const childElements = Array.from(element.querySelectorAll(':scope > div, :scope > p, :scope > ul'));

  // Process the content in a structured way
  const contentRows = childElements.map((child) => {
    // Handle images, text, and lists
    if (child.querySelector('img')) {
      return [child.querySelector('img')];
    } else if (child.querySelector('ul')) {
      return [child.querySelector('ul')];
    } else {
      return [child];
    }
  });

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);

  // Replace the original element with the new table
  element.replaceWith(table);

  return table;
}