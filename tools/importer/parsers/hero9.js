/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero9)'];

  const rows = [];

  // Iterate over each carousel item
  element.querySelectorAll(':scope > div').forEach((carouselItem) => {
    const imageContainer = carouselItem.querySelector('.carousel-image picture');
    const textContainer = carouselItem.querySelector('.carousel-text');

    const image = imageContainer.querySelector('img');
    const heading = textContainer.querySelector('h1, h2');
    const subheading = textContainer.querySelector('p:not(.button-container)');
    const description = textContainer.querySelectorAll('p:not(.button-container)');
    const buttonContainer = textContainer.querySelector('.button-container a');

    const cellContent = [];

    if (image) {
      cellContent.push(image);
    }

    if (heading) {
      const headingClone = document.createElement(heading.tagName);
      headingClone.innerHTML = heading.innerHTML;
      cellContent.push(headingClone);
    }

    if (description && description.length > 0) {
      description.forEach((desc) => {
        const descClone = document.createElement('p');
        descClone.innerHTML = desc.innerHTML;
        cellContent.push(descClone);
      });
    }

    if (buttonContainer) {
      const buttonClone = document.createElement('a');
      buttonClone.href = buttonContainer.href;
      buttonClone.title = buttonContainer.title;
      buttonClone.className = buttonContainer.className;
      buttonClone.innerHTML = buttonContainer.innerHTML;
      cellContent.push(buttonClone);
    }

    rows.push([cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the table
  element.replaceWith(table);
}