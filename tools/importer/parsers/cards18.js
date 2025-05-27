/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards18)'];
  const contentRows = [];

  // Select all immediate child elements of the columns-wrapper div
  const cards = element.querySelectorAll(':scope > div > div');

  cards.forEach((card) => {
    const imageContainer = card.querySelector(':scope > div:first-child picture img');
    const textContainer = card.querySelector(':scope > div:last-child');

    if (imageContainer && textContainer) {
      // Extract image element
      const image = imageContainer;

      // Extract text content
      const title = textContainer.querySelector('strong');
      const descriptionNodes = Array.from(textContainer.childNodes).filter(
        (node) => node.nodeType === 3 || node.tagName === 'BR' || node.tagName === 'A' // 3 is the Node.TEXT_NODE equivalent
      );

      const description = document.createElement('div');
      if (title) {
        description.appendChild(title.cloneNode(true));
      }
      descriptionNodes.forEach((node) => {
        description.appendChild(node.cloneNode(true));
      });

      // Add row to content
      contentRows.push([image, description]);
    }
  });

  // Combine header and content rows
  const tableData = [headerRow, ...contentRows];

  // Create and replace table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}