/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero2)'];

  // Extract dynamic content
  const heroContent = element.querySelector(':scope > div > div > div > div');
  if (!heroContent) {
    console.warn('Hero content not found. Skipping processing for this element.');
    return;
  }

  const image = heroContent.querySelector('picture img');
  const heading = heroContent.querySelector('h1');

  // Ensure extracted content is valid
  const contentRow = [];
  if (image) {
    contentRow.push(image);
  }
  if (heading) {
    contentRow.push(heading);
  }

  if (contentRow.length === 0) {
    console.warn('No valid content found for the second row. Skipping processing for this element.');
    return;
  }

  // Adjust table structure to meet requirements
  const cells = [
    headerRow, // Single-column header row
    [contentRow], // Single-column content row combining all extracted elements
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the newly created block table
  element.replaceWith(block);
}