/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns10)'];

  const contentRows = [];

  // Check if element has required content
  if (!element || !element.querySelector(':scope > div')) {
    console.error('Missing required elements in the source HTML');
    return;
  }

  // Extract immediate children of the element
  const immediateChildren = element.querySelectorAll(':scope > div');

  immediateChildren.forEach((child) => {
    const cells = [];

    // Extract images
    const images = Array.from(child.querySelectorAll('img'));
    if (images.length > 0) {
      cells.push(images);
    }

    // Extract text content
    const textElements = Array.from(child.querySelectorAll('h2, h3, p, ul'));
    if (textElements.length > 0) {
      cells.push(textElements);
    }

    // Extract links
    const links = Array.from(child.querySelectorAll('a')).map(link => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent;
      return anchor;
    });

    if (links.length > 0) {
      cells.push(links);
    }

    // Add row if content exists
    if (cells.length > 0) {
      contentRows.push(cells);
    }
  });

  // Check if content rows are populated
  if (contentRows.length === 0) {
    console.error('No content extracted from the source HTML');
    return;
  }

  const tableArray = [
    headerRow,
    ...contentRows
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);

  element.replaceWith(blockTable);
}