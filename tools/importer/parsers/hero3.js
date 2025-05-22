/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row consistent with the example
  const headerRow = ['Hero (hero3)'];

  // Extract content dynamically from the element
  const content = element.querySelector(':scope > div > div > div > div');

  // Extract the image and heading from the content
  const image = content.querySelector('picture img');
  const heading = content.querySelector('h1');

  // Handle edge cases where elements might not exist
  const imageElement = image ? image : document.createTextNode('');
  const headingElement = heading ? heading : document.createTextNode('');

  // Combine all content into a single cell
  const combinedContent = document.createElement('div');
  if (imageElement) combinedContent.appendChild(imageElement);
  if (headingElement) combinedContent.appendChild(headingElement);

  // Create the cells array for the table
  const cells = [
    headerRow, // Header row
    [combinedContent], // Content row (single column)
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}