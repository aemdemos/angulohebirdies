/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards9)'];

  const rows = Array.from(element.querySelectorAll(':scope > div')).map((card) => {
    const imageWrapper = card.querySelector(':scope > div > div:first-child picture');
    const image = (imageWrapper && imageWrapper.querySelector('img')) || null;

    const contentWrapper = card.querySelector(':scope > div > div:last-child');
    const titleElement = contentWrapper.querySelector('strong');
    const title = titleElement ? titleElement.cloneNode(true) : null;

    const descriptionSections = [];
    Array.from(contentWrapper.childNodes).forEach((node) => {
      if (node.nodeType === 1 && node.tagName === 'A') {
        const link = node.cloneNode(true);
        descriptionSections.push(link);
      } else if (node.nodeType === 3 && node.textContent.trim()) {
        const text = document.createTextNode(node.textContent.trim());
        descriptionSections.push(text);
      }
    });

    return [
      image,
      [title, ...descriptionSections],
    ];
  });

  const cells = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}