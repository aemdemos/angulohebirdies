/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Create the header row
  const headerRow = ['Embed'];

  // Extract image from the footer
  const image = element.querySelector('img');
  const imageElement = image ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = image.src;
    imageElement.alt = image.alt;
  }

  // Extract links from the footer
  const links = Array.from(element.querySelectorAll('a')).map((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.textContent;
    return anchor;
  });

  // Separate links into individual rows
  const linksRows = links.map((link) => [link]);

  // Extract email and copyright text
  const email = element.querySelector('a[href^="mailto:"]');
  const copyrightText = element.querySelector('p')?.textContent.trim();

  // Assemble the table structure
  const cells = [
    headerRow,
    [imageElement || ''],
    ...linksRows,
    [email ? email.textContent : '', copyrightText || ''],
  ];

  // Create the table
  const table = createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}