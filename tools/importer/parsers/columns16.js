/* global WebImporter */
 export default function parse(element, { document }) {
  // Extract the necessary information from the given element
  const cards = element.querySelector('.cards');
  const listItems = cards.querySelectorAll(':scope > ul > li');

  const rows = [];

  const headerRow = ['Columns (columns16)'];
  rows.push(headerRow);

  const contentRow = [];

  listItems.forEach((listItem) => {
    const imageContainer = listItem.querySelector('.cards-card-image');
    const img = imageContainer.querySelector('img');

    const bodyContainer = listItem.querySelector('.cards-card-body');
    const heading = bodyContainer.querySelector('h3');
    const description = bodyContainer.querySelector('p');

    const columnContent = document.createElement('div');
    columnContent.appendChild(img);
    columnContent.appendChild(heading);
    columnContent.appendChild(description);

    contentRow.push(columnContent);
  });

  rows.push(contentRow);

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}