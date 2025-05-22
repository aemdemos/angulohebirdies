/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly matching the example structure
  const headerRow = ['Columns (columns15)'];

  // Extract all cards within the cards wrapper
  const cardsWrapper = element.querySelectorAll(':scope > div.cards-wrapper > div.cards > ul > li');

  // Map over each card to construct rows dynamically from the element
  const rows = Array.from(cardsWrapper).map((card) => {
    // Extract the image element dynamically
    const image = card.querySelector('.cards-card-image img');
    const imgElement = image.cloneNode(true);  // Clone the image element to retain attributes such as src and alt

    // Extract body content and callout button dynamically
    const bodyContent = card.querySelector('.cards-card-body');
    const calloutButton = card.querySelector('.callout-overlay a');

    // Create a link element dynamically for the callout button
    const calloutLink = document.createElement('a');
    calloutLink.href = calloutButton.href;
    calloutLink.innerHTML = calloutButton.innerHTML;

    // Return the row with the dynamically extracted content
    return [imgElement, [bodyContent, calloutLink]];
  });

  // Combine the header row and dynamically created rows into table data
  const tableData = [headerRow, ...rows];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the generated block table
  element.replaceWith(blockTable);
}