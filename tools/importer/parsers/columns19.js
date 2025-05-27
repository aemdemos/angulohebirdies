/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns (columns19)'];

  // Extract the child elements directly related to the content
  const childElements = element.querySelectorAll(':scope > div, :scope > p, :scope > ul, :scope > h2, :scope > h3');

  // Create rows for the table based on extracted content
  const rows = [headerRow];

  childElements.forEach((child) => {
    const cellContent = [];

    // Add text or HTML content to the cell
    if (child.tagName === 'P' || child.tagName === 'H2' || child.tagName === 'H3') {
      cellContent.push(child);
    } else if (child.tagName === 'UL') {
      cellContent.push(child);
    } else if (child.tagName === 'DIV') {
      const images = child.querySelectorAll('img');
      images.forEach((img) => {
        cellContent.push(img);
      });
    }

    // Add the collected cell content as a new row
    if (cellContent.length > 0) {
      rows.push([cellContent]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}