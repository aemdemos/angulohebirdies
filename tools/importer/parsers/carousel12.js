/* global WebImporter */
export default function parse(element, { document }) {
  const slides = Array.from(element.querySelectorAll(':scope > div'));
  const rows = slides.map((slide) => {
    const imageWrapper = slide.querySelector('.carousel-image');
    const img = imageWrapper?.querySelector('img');

    const textWrapper = slide.querySelector('.carousel-text');
    const title = textWrapper?.querySelector('h1, h2');
    const paragraphs = Array.from(textWrapper?.querySelectorAll('p') || []);
    const cta = textWrapper?.querySelector('p.button-container a');

    const textContent = [];

    if (title) {
      textContent.push(title);
    }

    if (paragraphs.length) {
      textContent.push(...paragraphs);
    }

    if (cta) {
      textContent.push(cta);
    }

    return [img, textContent];
  });

  const headerRow = ['Carousel (carousel12)'];
  const cells = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}