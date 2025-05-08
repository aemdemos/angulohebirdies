/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extract Hero Block
  if (element.querySelector('.hero-wrapper')) {
    const heroWrapper = element.querySelector('.hero-wrapper');

    // Background Image
    const picture = heroWrapper.querySelector('picture');
    const img = picture.querySelector('img');

    // Title
    const title = heroWrapper.querySelector('h1');

    cells.push(['Hero']); // Header row with block name
    cells.push([img, title]); // Content row with image and title
  }

  // Ensure Section Metadata is only included if explicitly required
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}