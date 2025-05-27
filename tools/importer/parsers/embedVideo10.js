/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the block elements from the given HTML
  const image = element.querySelector('picture img'); // Get the image inside the picture tag
  const links = Array.from(element.querySelectorAll('ul a[href]')); // Get all links inside the UL

  // Ensure all elements are properly extracted and handle missing cases
  const imageElement = image ? image : document.createTextNode(''); // Fallback if no image is found
  const linkElements = links.length ? links : [document.createTextNode('')]; // Fallback if no links are found

  // Create a cell that combines image and links
  const combinedCell = [imageElement, ...linkElements];

  // Create an array for the table rows
  const cells = [
    ['Embed (embedVideo10)'], // Header row (block name)
    [combinedCell], // Content row (image and links)
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new block table
  element.replaceWith(blockTable);
}