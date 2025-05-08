/* global WebImporter */
export default function parse(element, { document }) {
  const blocks = [];

  // Helper function to create and push a block
  function createBlock(header, rows) {
    const cells = [
      [header],
      ...rows,
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    blocks.push(block);
  }

  // Parsing Hero block
  const heroElement = element.querySelector('.hero');
  if (heroElement) {
    const image = heroElement.querySelector('img');
    const title = heroElement.querySelector('h1');

    const rows = [];
    if (image) rows.push([image]);
    if (title) rows.push([title]);

    createBlock('Hero', rows);
  }

  // Parsing Text block
  const textElement = element.querySelector('.text.bluebox.block');
  if (textElement) {
    const textContent = textElement.querySelector('div');

    const rows = [];
    if (textContent) rows.push([textContent.textContent.trim()]);

    createBlock('Text', rows);
  }

  // Parsing Default Content blocks
  const defaultContentWrappers = element.querySelectorAll('.default-content-wrapper');
  defaultContentWrappers.forEach((wrapper) => {
    const heading = wrapper.querySelector('h2');
    const paragraph = wrapper.querySelector('p');

    const rows = [];
    if (heading) rows.push([heading.textContent.trim()]);
    if (paragraph && paragraph.textContent.trim()) rows.push([paragraph.textContent.trim()]);

    if (rows.length > 0) {
      createBlock('Default Content', rows);
    }
  });

  // Replace original element with blocks
  element.replaceWith(...blocks);
}