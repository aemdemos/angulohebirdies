/* global WebImporter */
export default function parse(element, { document }) {
  // Validate that the required elements are in the source HTML
  if (!element) {
    throw new Error('Missing required element in the source HTML');
  }

  // Define the header row
  const headerRow = ['Columns (columns10)'];

  // Extract content dynamically from default wrapper
  const contentWrapper = element.querySelector(':scope > .default-content-wrapper');
  const contentElements = [];

  if (contentWrapper) {
    const heading = contentWrapper.querySelector('h2');
    const paragraphs = contentWrapper.querySelectorAll('p');

    if (heading) {
      contentElements.push(heading);
    }

    paragraphs.forEach((p) => {
      contentElements.push(p);
    });
  }

  // Extract cards dynamically
  const cardsWrapper = element.querySelector(':scope > .cards-wrapper');
  const cardRows = [];

  if (cardsWrapper) {
    const cardsBlock = cardsWrapper.querySelector(':scope > .cards');
    if (cardsBlock) {
      const cards = cardsBlock.querySelectorAll(':scope > ul > li');
      cards.forEach((card) => {
        const cardContent = [];

        const image = card.querySelector(':scope .cards-card-image img');
        if (image) {
          cardContent.push(image);
        }

        const text = card.querySelector(':scope .cards-card-body strong');
        if (text) {
          cardContent.push(text);
        }

        const link = card.querySelector(':scope .callout-overlay a');
        if (link) {
          const linkElement = document.createElement('a');
          linkElement.href = link.href;
          linkElement.textContent = link.textContent;
          cardContent.push(linkElement);
        }

        if (cardContent.length > 0) {
          cardRows.push(cardContent);
        }
      });
    }
  }

  // Combine header row and content
  const rows = [
    headerRow,
    ...(contentElements.length > 0 ? [contentElements] : []),
    ...cardRows
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}