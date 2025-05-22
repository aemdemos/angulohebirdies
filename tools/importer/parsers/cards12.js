/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Cards (cards12)'];

  // Map through each card to extract content
  const rows = [...element.querySelectorAll(':scope > div.cards.icons.block ul > li')].map((card) => {
    // Extract the image element
    const image = card.querySelector('.cards-card-image img');
    const cardImage = image ? image : '';

    // Extract the card body containing text content
    const cardBody = card.querySelector('.cards-card-body');
    const title = cardBody.querySelector('h3');
    const description = cardBody.querySelector('p');

    // Combine text content (title and description)
    const textContent = [];
    if (title) textContent.push(title);
    if (description) textContent.push(description);

    return [cardImage, textContent];
  });

  // Create the block table with the extracted content
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the created table
  element.replaceWith(table);
}