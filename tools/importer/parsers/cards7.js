/* global WebImporter */
export default function parse(element, { document }) {
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  const headerRow = ['Cards (cards7)'];
  const rows = columns.map(column => {
    const imageWrapper = column.querySelector('div:first-child picture');
    const textWrapper = column.querySelector('div:last-child');

    const image = imageWrapper.querySelector('img');
    const title = textWrapper.querySelector('strong');
    const contentNodes = Array.from(textWrapper.childNodes).filter(node => {
      return node.nodeType === 3 || node.tagName === 'BR' || node.tagName === 'A';
    });

    const content = [];
    if (title) content.push(title);
    if (contentNodes.length > 0) content.push(...contentNodes);

    return [image, content];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}