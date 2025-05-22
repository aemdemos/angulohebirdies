/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel13)'];

  // Extract slides
  const slides = Array.from(element.querySelectorAll(':scope > div'));

  const rows = slides.map((slide) => {
    const imageContainer = slide.querySelector(':scope > .carousel-image img');
    const textContainer = slide.querySelector(':scope > .carousel-text');

    const imageElement = imageContainer ? imageContainer.cloneNode(true) : document.createTextNode('');

    const textContent = [];

    if (textContainer) {
      const heading = textContainer.querySelector('h1, h2');
      if (heading) {
        textContent.push(heading.cloneNode(true));
      }

      const paragraphs = textContainer.querySelectorAll('p');
      paragraphs.forEach((paragraph) => {
        textContent.push(paragraph.cloneNode(true));
      });

      const buttonLink = textContainer.querySelector('a');
      if (buttonLink && !textContainer.querySelector(`p > a[href="${buttonLink.href}"]`)) {
        textContent.push(buttonLink.cloneNode(true)); // Ensure no duplicate links
      }
    }

    return [imageElement, textContent];
  });

  const tableData = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}