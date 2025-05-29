/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns6)'];

  // Fetching the immediate children of the block
  const children = [...element.querySelectorAll(':scope > div > div')];

  // Create cells for the second row with separate columns for content
  const cells = children.map((child) => {
    const textCell = [];

    // Extract heading, paragraph, and list content
    const heading = child.querySelector('h2, h3, h4, h5, h6');
    if (heading) textCell.push(heading);

    const paragraph = child.querySelector('p');
    if (paragraph) textCell.push(paragraph);

    const list = child.querySelector('ul, ol');
    if (list) textCell.push(list);

    const links = [...child.querySelectorAll('a')];
    if (links.length) textCell.push(...links);

    const imageCell = child.querySelector('picture img');

    // Return separate columns for text and image
    return [textCell.length > 0 ? textCell : '', imageCell || ''];
  });

  const tableBlockCells = [headerRow, ...cells];
  const blockTable = WebImporter.DOMUtils.createTable(tableBlockCells, document);

  element.replaceWith(blockTable);
}