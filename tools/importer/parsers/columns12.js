/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header row
  const headerRow = ['Columns (columns12)'];

  // Extract content rows
  const contentRows = [];

  // Get the cards-wrapper element
  const cardsWrapper = element.querySelector('.cards-wrapper');

  if (cardsWrapper) {
    const cards = cardsWrapper.querySelectorAll('li');
    cards.forEach((card) => {
      const imageContainer = card.querySelector('.cards-card-image img');
      const imageElement = imageContainer ? imageContainer : '';

      const bodyContainer = card.querySelector('.cards-card-body strong a');
      const bodyElement = bodyContainer ? bodyContainer : '';

      contentRows.push([imageElement, bodyElement]);
    });
  }

  // Create the table using WebImporter.DOMUtils.createTable
  const cells = [headerRow, ...contentRows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}