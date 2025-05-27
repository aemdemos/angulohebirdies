/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards5)'];

  const rows = [...element.querySelectorAll(':scope > div')].map(card => {
    const imageElement = card.querySelector('picture img');
    const textContainer = card.querySelector('div:last-of-type');

    // Ensure all content is extracted within the textContainer
    const clonedTextContainer = textContainer ? textContainer.cloneNode(true) : document.createElement('div');

    // Convert all non-image elements with 'src' attributes into links
    [...clonedTextContainer.querySelectorAll('[src]')].forEach(srcElement => {
      if (srcElement.tagName.toLowerCase() !== 'img') {
        const link = document.createElement('a');
        link.href = srcElement.getAttribute('src');
        link.textContent = srcElement.getAttribute('src');
        srcElement.replaceWith(link);
      }
    });

    return [imageElement, clonedTextContainer];
  });

  const tableData = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}