/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the block name and prepare the correct header row
  const headerRow = ['Columns'];

  // Initialize rows to collect content dynamically
  const rows = [];

  // Process each card item dynamically from the list
  const ul = element.querySelector(':scope > div.cards.icons.block > ul');
  if (ul) {
    ul.querySelectorAll(':scope > li').forEach((item) => {
      const imageContainer = item.querySelector('.cards-card-image picture');
      const image = imageContainer?.querySelector('img'); // Extract image dynamically

      const cardBody = item.querySelector('.cards-card-body');
      const title = cardBody?.querySelector('h3');
      const link = title?.querySelector('a'); // Extract link dynamically

      // Correctly populate the <h3> text content
      const titleText = link?.textContent || '';
      if (title) {
        title.textContent = titleText;
      }

      const description = cardBody?.querySelector('p');

      // Push content into rows keeping semantic meaning intact
      rows.push([
        image ? [image] : [],
        [title, description, link].filter(Boolean), // Include only valid elements
      ]);
    });
  }

  // Create the table dynamically using WebImporter.DOMUtils.createTable
  const tableArray = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}