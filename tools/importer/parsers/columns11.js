/* global WebImporter */
export default function parse(element, { document }) {
  // Validate the example Markdown structure
  const exampleMarkdownIncludesSectionMetadata = false; // Derived from the example Markdown structure

  // Create header row
  const headerRow = ['Columns'];

  // Extract content for the first column
  const column1Content = [];
  const listItems = Array.from(element.querySelectorAll('.nav-sections ul li a'));
  const button = element.querySelector('.nav-tools a');

  if (listItems.length) {
    const list = document.createElement('ul');
    listItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item.textContent;
      list.appendChild(listItem);
    });
    column1Content.push(list);
  }

  if (button) {
    const buttonElement = document.createElement('a');
    buttonElement.href = button.href;
    buttonElement.textContent = button.textContent;
    buttonElement.className = button.className;
    column1Content.push(buttonElement);
  }

  // Extract content for the second column (image)
  const column2Content = [];
  const imageElement = element.querySelector('.nav-brand picture img');
  if (imageElement) {
    const img = document.createElement('img');
    img.src = imageElement.src;
    img.alt = imageElement.alt;
    column2Content.push(img);
  }

  // Create rows for the table
  const rows = [
    headerRow,
    [column1Content, column2Content],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}