/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row as per the example
  const headerRow = ['Columns'];

  // Initialize an array to store the column content
  const columnsContent = [];

  // Extract immediate child div elements from the element
  const childDivs = element.querySelectorAll(':scope > div');

  childDivs.forEach((div) => {
    const columnItems = [];

    // Extract list items if present
    const listItems = div.querySelectorAll('li');
    if (listItems.length > 0) {
      listItems.forEach((listItem) => {
        const listItemElement = document.createElement('p');
        listItemElement.textContent = `- ${listItem.textContent.trim()}`;
        columnItems.push(listItemElement);
      });
    }

    // Extract button if present
    const button = div.querySelector('a.button');
    if (button) {
      columnItems.push(button);
    }

    // Extract image if present
    const columnImage = div.querySelector('img');
    if (columnImage) {
      columnsContent.push([columnImage, columnItems]);
    } else {
      columnsContent.push([columnItems]);
    }
  });

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...columnsContent], document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}