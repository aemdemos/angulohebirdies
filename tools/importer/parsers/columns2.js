/* global WebImporter */
export default function parse(element, { document }) {
  // Extract Header Row
  const headerRow = ['Columns'];

  // Extract Content Row
  const columnCells = [];

  const list = element.querySelector('.nav-sections ul');
  if (list) {
    const listItems = Array.from(list.querySelectorAll('li')).map((item) => item.textContent.trim());
    const listElement = document.createElement('ul');
    listItems.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      listElement.appendChild(li);
    });
    columnCells.push(listElement);
  } else {
    columnCells.push(''); // Handle empty list edge case
  }

  const brandImage = element.querySelector('.nav-brand img');
  if (brandImage) {
    const imgElement = document.createElement('img');
    imgElement.src = brandImage.src;
    imgElement.alt = brandImage.alt;
    columnCells.push(imgElement);
  } else {
    columnCells.push(''); // Handle missing image edge case
  }

  const donateButton = element.querySelector('.nav-tools .button-container a');
  if (donateButton) {
    const anchorElement = document.createElement('a');
    anchorElement.href = donateButton.href;
    anchorElement.textContent = donateButton.textContent.trim();
    columnCells.push(anchorElement);
  } else {
    columnCells.push(''); // Handle missing button edge case
  }

  const rows = [headerRow, columnCells]; // Ensure content is distributed across multiple columns

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}