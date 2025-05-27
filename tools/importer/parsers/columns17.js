/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns17)'];

  const columns = Array.from(element.querySelectorAll(':scope > div > div > div'));

  const rows = columns.map((column) => {
    const content = [];
    Array.from(column.children).forEach((child) => {
      if (child.tagName === 'PICTURE' || child.tagName === 'IMG') {
        content.push(child);
      } else if (child.tagName === 'IFRAME') {
        const link = document.createElement('a');
        link.href = child.src;
        link.textContent = 'Link';
        content.push(link);
      } else {
        content.push(child);
      }
    });
    return content;
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}