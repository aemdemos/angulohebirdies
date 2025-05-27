/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel13)'];
  const rows = [headerRow];

  // Get all immediate child div elements of the target element
  const slides = element.querySelectorAll(':scope > div > div');

  slides.forEach(slide => {
    const imageWrapper = slide.querySelector('picture');
    const textWrapper = slide.querySelector('div');

    const image = imageWrapper ? imageWrapper : '';
    const textContent = textWrapper ? textWrapper : '';

    rows.push([image, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}