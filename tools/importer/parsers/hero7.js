/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero7)'];

  // Extracting the main content from the element
  const heroWrapper = element.querySelector(':scope > div > div.hero-wrapper');
  const image = heroWrapper.querySelector('picture img'); // Ensuring we get the img element inside picture
  const heading = heroWrapper.querySelector('h1');

  // Validate presence of mandatory elements
  if (!heading) {
    console.warn('Heading is missing');
  }

  // Creating table structure
  const cells = [
    headerRow, // Header row
    [image, heading] // Content row with image and heading
  ];

  // Creating the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing original element with the block table
  element.replaceWith(block);
}