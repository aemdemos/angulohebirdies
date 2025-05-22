/* global WebImporter */
export default function parse(element, { document }) {
  // Identify the block name
  const headerRow = ['Cards (cards11)'];

  // Extract all card items from the block
  const cards = element.querySelectorAll(':scope > div.cards ul > li');

  // Parse cards into rows
  const rows = Array.from(cards).map((card) => {
    // Extract image
    const imageContainer = card.querySelector('.cards-card-image');
    const image = imageContainer ? imageContainer.querySelector('img') : null;

    // Extract body content
    const body = card.querySelector('.cards-card-body');
    const title = body ? body.querySelector('h3') : null;
    const description = body ? body.querySelector('p') : null;

    // Combine extracted elements into a row
    return [
      image,
      [title, description].filter(Boolean),
    ];
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(
    [headerRow, ...rows],
    document
  );

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}