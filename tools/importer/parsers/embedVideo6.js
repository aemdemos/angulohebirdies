/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the block table
  const headerRow = ['Embed (embedVideo6)'];

  // Extract the image element from the provided HTML
  const imageElement = element.querySelector('picture img');

  // Extract the URL for embedding from the provided HTML
  const linkElement = element.querySelector(':scope > div > div > ul > li a[href]');
  const embedLink = document.createElement('a');

  if (linkElement) {
    embedLink.href = linkElement.getAttribute('href');
    embedLink.textContent = linkElement.getAttribute('href');
  }

  // Prepare table cell data
  const cells = [
    headerRow,
    [[imageElement, embedLink]], // Combine image and link into a single cell
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}