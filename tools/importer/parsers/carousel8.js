/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel8)'];
  const rows = [];

  // Check each immediate child div for slide content
  element.querySelectorAll(':scope > div').forEach((slide) => {
    // Extract image from carousel-image section
    const imageContainer = slide.querySelector('.carousel-image picture');
    let imageElement = null;
    if (imageContainer) {
      imageElement = imageContainer.querySelector('img');
    }

    // Extract text content from carousel-text section
    const textContainer = slide.querySelector('.carousel-text');
    const textElements = [];

    if (textContainer) {
      // Extract title if exists
      const title = textContainer.querySelector('h1, h2');
      if (title) {
        textElements.push(title);
      }

      // Extract paragraphs
      textContainer.querySelectorAll('p:not(.button-container)').forEach((paragraph) => {
        textElements.push(paragraph);
      });

      // Extract button if exists
      const button = textContainer.querySelector('p.button-container a.button');
      if (button) {
        textElements.push(button);
      }
    }

    // Add row if both image and text content exist
    rows.push([imageElement, textElements]);
  });

  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}