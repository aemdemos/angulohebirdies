/* global WebImporter */
export default function parse(element, { document }) {
  const columns = [];

  // Extract all column items
  const columnItems = element.querySelectorAll('.columns.block.columns-2-cols > div');

  if (!columnItems || columnItems.length === 0) {
    console.warn('No column items found');
    return;
  }

  columnItems.forEach((columnItem) => {
    // Extract image if available
    const pictureElement = columnItem.querySelector('picture');
    const image = pictureElement?.querySelector('img');
    const imageElement = image ? document.createElement('img') : null;

    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    }

    // Extract text content
    const textElement = columnItem.querySelector('div:last-child');
    const strongElement = textElement?.querySelector('strong');
    let description = '';

    if (strongElement) {
      description = `<strong>${strongElement.textContent}</strong><br>`;
      const remainingText = textElement.innerHTML.replace(strongElement.outerHTML, '').trim();
      description += remainingText;
    } else {
      description = textElement ? textElement.innerHTML.trim() : '';
    }

    // Push image and description into columns
    columns.push([imageElement, description]);
  });

  const cells = [['Columns'], ...columns];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}