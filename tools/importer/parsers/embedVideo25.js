/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  cells.push(['Embed']);

  // Content row
  const imageElement = element.querySelector('img');
  const image = imageElement ? imageElement.cloneNode(true) : null;

  const links = [...element.querySelectorAll('a')].filter(link => link.href && link.href.trim() !== '');
  const linkElements = links.map(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.href;
    return a;
  });

  const content = [];
  if (image) content.push(image);
  content.push(...linkElements); // Ensures the image is added before the links

  cells.push([content]);

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}