/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row matching the example
  const headerRow = ['Columns (columns3)'];

  // Initialize cells array
  const cells = [headerRow];

  // Extract content dynamically from the element
  const children = Array.from(element.querySelectorAll(':scope > div'));

  children.forEach((child) => {
    const row = [];

    // Handle images
    const image = child.querySelector('img');
    if (image) {
      row.push(image);
    }

    // Handle links
    const link = child.querySelector('a');
    if (link) {
      const anchorElement = document.createElement('a');
      anchorElement.href = link.href;
      anchorElement.textContent = link.textContent.trim() || 'Link'; // Dynamically reflect actual text from source HTML
      row.push(anchorElement);
    }

    // Handle lists (extract individual list items and preserve structure)
    const list = child.querySelector('ul');
    if (list) {
      const listItems = Array.from(list.querySelectorAll('li')).map((li) => {
        const listItemElement = document.createElement('p');
        listItemElement.textContent = li.textContent.trim();
        return listItemElement;
      });
      row.push(listItems); // Add list items as structured elements in the row
    }

    // Add the row to the cells
    if (row.length > 0) {
      cells.push(row);
    }
  });

  // Create table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}