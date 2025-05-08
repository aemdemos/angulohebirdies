/* global WebImporter */
export default function parse(element, { document }) {
  // Extract columns
  const columnsWrapper = element.querySelector('.columns-wrapper');
  const columnsBlock = columnsWrapper.querySelector('.columns.block');

  // Header row
  const headerRow = ['Columns'];

  // First column (content)
  const firstColumn = columnsBlock.querySelector('div:first-child');
  const heading = firstColumn.querySelector('h2');
  const paragraph = firstColumn.querySelector('p');

  // Second column (image)
  const secondColumn = columnsBlock.querySelector('div:nth-child(2)');
  const imageTag = secondColumn.querySelector('img');

  // Combine heading, paragraph, and image into a single cell
  const combinedCell = [heading, paragraph, imageTag];

  // Structure the table
  const cells = [
    headerRow,
    [combinedCell],
  ];

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}