/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Embed'];
  cells.push(headerRow);

  // Content row
  const imgSrc = element.querySelector('img')?.src || '';
  const imgElement = imgSrc ? document.createElement('img') : null;
  if (imgElement) imgElement.src = imgSrc;

  const externalLink = element.querySelector('a')?.href || '';
  const linkElement = externalLink ? document.createElement('a') : null;
  if (linkElement) {
    linkElement.href = externalLink;
    linkElement.textContent = externalLink;
  }

  const combinedContent = [imgElement, linkElement].filter(Boolean);
  const contentRow = [combinedContent]; // Combine image and link into a single cell
  cells.push(contentRow);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}