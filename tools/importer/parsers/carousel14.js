/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row
  const headerRow = ['Carousel (carousel14)'];

  // Extract rows dynamically from the element
  const rows = Array.from(element.querySelectorAll(':scope > div > div'))
    .filter((child) => child.querySelector('picture')) // Only include rows with images
    .map((child) => {
      // Dynamically extract the image element
      const imageElement = child.querySelector('picture');
      
      // Dynamically extract the content element and ensure semantic meaning
      const contentElement = child.querySelector('div:nth-child(2)');
      const textCell = contentElement ? Array.from(contentElement.childNodes) : []; // Collect all text content

      // Handle edge cases for empty or missing data
      const imageCell = imageElement || document.createElement('div'); // Default to empty div if no image

      return [imageCell, textCell];
    });

  // Construct table data
  const tableData = [headerRow, ...rows];

  // Create the block table dynamically
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}