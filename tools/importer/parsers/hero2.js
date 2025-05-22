/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the immediate children of the block
  const children = element.querySelectorAll(':scope > div > div > div > div');

  // Extract relevant elements dynamically
  const picture = children[0].querySelector('picture');
  const heading = children[0].querySelector('h1');

  // Ensure all dynamically extracted content is properly included in the table
  const headerRow = ['Hero (hero2)'];
  const contentRow = [
    [picture, heading], // Combine both picture and heading within the same cell
  ];

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}