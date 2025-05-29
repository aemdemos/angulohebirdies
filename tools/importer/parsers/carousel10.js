/* global WebImporter */
export default function parse(element, { document }) {
  const slides = [...element.querySelectorAll(':scope > div')];

  const headerRow = ['Carousel (carousel10)'];
  const cells = [headerRow];

  slides.forEach((slide) => {
    const imageContainer = slide.querySelector('.carousel-image img');
    if (!imageContainer) return; // Skip if no image is present
    const image = imageContainer.cloneNode(true);

    const textContainer = slide.querySelector('.carousel-text');
    const textElements = [];

    if (textContainer) {
      const heading = textContainer.querySelector('h1, h2');
      if (heading) textElements.push(heading.cloneNode(true));

      const paragraphs = textContainer.querySelectorAll('p');
      paragraphs.forEach((paragraph) => {
        textElements.push(paragraph.cloneNode(true));
      });
    }

    cells.push([image, textElements]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}