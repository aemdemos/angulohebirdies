/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel11)'];
  const rows = [];

  const processedImages = new Set(); // To avoid duplicate rows

  element.querySelectorAll(':scope > div:not(.carousel-buttons) > div').forEach((block) => {
    const picture = block.querySelector('picture');
    const textContainer = block.querySelector('div');

    const img = picture?.querySelector('img');
    const textContent = textContainer?.textContent.trim() ? textContainer : null;

    if (img && !processedImages.has(img.src)) { // Avoid duplicates using Set
      processedImages.add(img.src);
      rows.push([img, textContent || '']); // Include empty string if no text content
    }
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}