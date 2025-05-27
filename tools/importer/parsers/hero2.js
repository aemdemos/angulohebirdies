/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Hero (hero2)'];

  // Extract content from the element
  const picture = element.querySelector('picture');
  const heading = element.querySelector('h1');

  // Handle edge cases for missing picture or heading
  const parsedPicture = picture || document.createElement('div');
  const parsedHeading = heading || document.createElement('div');

  // Combine picture and heading into a single cell
  const combinedCell = [parsedPicture, parsedHeading];

  // Create the cells array for the table
  const cells = [
    headerRow,
    [combinedCell] // Ensure only one cell in the content row
  ];

  // Create the block table using WebImporter utility
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}