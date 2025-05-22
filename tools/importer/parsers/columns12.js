/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns12)'];

  // Get the immediate child elements of the block
  const children = Array.from(element.querySelectorAll(':scope > div.columns-wrapper > div.columns > div > div'));

  // Extract relevant content
  const leftColumnContent = children[0];
  const rightColumnContent = children[1];

  const tableData = [
    headerRow,
    [
      leftColumnContent,
      rightColumnContent,
    ],
  ];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}