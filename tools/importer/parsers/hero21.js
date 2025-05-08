/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extracting the Hero block content
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    const blockName = 'Hero';
    const blockContent = [];

    // Extract image
    const imgTag = heroBlock.querySelector('picture img');
    if (imgTag) {
      const imgSrc = imgTag.src;
      const imgElement = document.createElement('img');
      imgElement.src = imgSrc;
      blockContent.push(imgElement);
    }

    // Extract heading
    const heading = heroBlock.querySelector('h1');
    if (heading) {
      const headingElement = document.createElement('h1');
      headingElement.textContent = heading.textContent;
      blockContent.push(headingElement);
    }

    // First row with block name
    cells.push([blockName]);
    // Second row with hero content
    cells.push([blockContent]);
  }

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}