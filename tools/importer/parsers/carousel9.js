/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel9)'];

  // Collect unique rows
  const uniqueImages = new Set();
  const rows = Array.from(element.querySelectorAll(':scope > .logos > div')).map((logoBlock) => {
    const imageContainer = logoBlock.querySelector('picture');
    const image = imageContainer && imageContainer.querySelector('img');
    if (image && !uniqueImages.has(image.src)) {
      uniqueImages.add(image.src);
      return [image];
    }
    return null; // Skip duplicates or empty rows
  }).filter(row => row !== null);

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}