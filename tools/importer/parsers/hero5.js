/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row based on the block name
  const headerRow = ['Hero (hero5)'];

  // Extract image element dynamically from the HTML
  const imgElement = element.querySelector(':scope img');

  // Extract heading element dynamically from the HTML
  const headingElement = element.querySelector(':scope h1');

  // Combine extracted image and heading into a single cell
  const contentCell = document.createElement('div');
  if (imgElement) contentCell.appendChild(imgElement);
  if (headingElement) contentCell.appendChild(headingElement);

  // Define table cells dynamically based on extracted elements
  const cells = [
    headerRow, // Block name header
    [contentCell], // Content row with image and heading combined
  ];

  // Create the block table using the provided helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}