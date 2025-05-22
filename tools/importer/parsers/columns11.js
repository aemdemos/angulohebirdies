/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the block name
  const headerRow = ['Columns (columns11)'];

  // Initialize rows array
  const rows = [];

  // Extract main content from the section
  const contentWrapper = element.querySelector('.default-content-wrapper');
  if (contentWrapper) {
    const contentCells = [];

    // Extract paragraphs and links
    const paragraphs = Array.from(contentWrapper.querySelectorAll('p'));
    paragraphs.forEach((p) => {
      const paragraphContent = [p];

      // Extract links within the paragraph
      const links = Array.from(p.querySelectorAll('a')).map((link) => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent;
        return anchor;
      });

      paragraphContent.push(...links);
      contentCells.push(paragraphContent);
    });

    rows.push(contentCells);
  }

  // Extract cards content
  const cardsWrapper = element.querySelector('.cards-wrapper');
  if (cardsWrapper) {
    const cardCells = [];

    const cards = Array.from(cardsWrapper.querySelectorAll('.cards-card-image, .cards-card-body'));
    cards.forEach((card) => {
      if (card.classList.contains('cards-card-image')) {
        // Handle images within cards
        const img = card.querySelector('img');
        if (img) {
          cardCells.push(img);
        }
      } else if (card.classList.contains('cards-card-body')) {
        // Handle card body text
        const strongTag = card.querySelector('strong');
        if (strongTag) {
          const link = strongTag.querySelector('a');
          if (link) {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = link.textContent;
            cardCells.push(anchor);
          }
        }
      }
    });

    rows.push(cardCells);
  }

  // Create table data by combining header and rows
  const tableData = [headerRow, ...rows];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}