/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as specified in the example
  const headerRow = ['Columns (columns11)'];

  // Extract immediate child elements of the block
  const childElements = Array.from(element.querySelectorAll(':scope > div'));

  // Map child elements into rows
  const rows = childElements.map((child) => {
    // Extract text content from the second child div
    const contentElement = child.querySelector(':scope > div:nth-child(2)');
    const textContent = contentElement
      ? Array.from(contentElement.childNodes).filter(
          (node) => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())
        )
      : document.createTextNode('');

    // Extract image from the first child div
    const imgElement = child.querySelector(':scope > div:nth-child(1) img');
    const image = imgElement || null;

    // Handle elements with 'src' attributes that are not images
    const srcElement = child.querySelector(':scope > div:nth-child(1)');
    if (srcElement && srcElement.tagName !== 'IMG' && srcElement.hasAttribute('src')) {
      const link = document.createElement('a');
      link.href = srcElement.getAttribute('src');
      link.textContent = srcElement.getAttribute('src');
      return [link, textContent];
    }

    // Return image and text content as separate cells in the row
    return [image, textContent];
  });

  // Construct the table cells array
  const cells = [
    headerRow,
    ...rows
  ];

  // Generate the block table using WebImporter.DOMUtils.createTable()
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}