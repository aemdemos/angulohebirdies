/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Extract data from the Hero block
  const heroBlock = element.querySelector('.hero-wrapper');
  if (!heroBlock) return; // Handle edge case where hero block is missing

  const imageElement = heroBlock.querySelector('img');
  const headingElement = heroBlock.querySelector('h1');

  // Prepare cells for the Hero block table
  const heroCells = [
    ['Hero'], // Header row matches example
    [
      imageElement ? imageElement.cloneNode(true) : '', // Dynamically extract image
      headingElement ? headingElement.cloneNode(true) : '' // Dynamically extract heading
    ]
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const heroTable = WebImporter.DOMUtils.createTable(heroCells, document);

  // Replace the original element with the new structured block
  element.replaceWith(hr, heroTable);
}