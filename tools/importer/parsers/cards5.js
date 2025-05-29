/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards5)'];
  const rows = [headerRow];

  // Select all cards
  const cards = element.querySelectorAll(':scope > div.cards.icons.block ul > li');

  cards.forEach((card) => {
    // Extract image
    const imageElement = card.querySelector('.cards-card-image picture img');
    const image = imageElement ? imageElement : document.createTextNode('');

    // Extract card body
    const bodyElement = card.querySelector('.cards-card-body');

    const titleElement = bodyElement?.querySelector('h3');
    const title = titleElement ? titleElement : document.createTextNode('');

    const descriptionElement = bodyElement?.querySelector('p');
    const description = descriptionElement ? descriptionElement : document.createTextNode('');

    // Combine title and description into the second cell
    const cellContent = document.createElement('div');
    cellContent.append(title, document.createElement('br'), description);

    rows.push([image, cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}