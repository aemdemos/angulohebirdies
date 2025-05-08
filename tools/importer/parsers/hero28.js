/* global WebImporter */
export default function parse(element, { document }) {

  const blocks = []; // Store all parsed blocks

  // Parsing the Hero Section
  const heroSection = element.querySelector('.hero-container');
  if (heroSection) {
    const imageElement = heroSection.querySelector('img');
    const headingElement = heroSection.querySelector('h1');

    const heroTable = WebImporter.DOMUtils.createTable([
      ['Hero'],
      [
        imageElement,
        headingElement ? headingElement.textContent.trim() : '',
      ],
    ], document);
    blocks.push(heroTable);
  }

  // Parsing the Form Section
  const formSection = element.querySelector('.form-container');
  if (formSection) {
    const formHeading = formSection.querySelector('h2');
    const formElement = formSection.querySelector('form');

    const formTable = WebImporter.DOMUtils.createTable([
      ['Form'],
      [
        formHeading ? formHeading.textContent.trim() : '',
        formElement.cloneNode(true),
      ],
    ], document);
    blocks.push(formTable);
  }

  // Replace the element with the parsed blocks
  element.replaceWith(...blocks);
}