/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row matching the example
  const headerRow = ['Hero (hero4)'];

  // Locate key parts of the element
  const heroWrapper = element.querySelector(':scope > div.hero-wrapper');
  const heroBlock = heroWrapper?.querySelector(':scope > div.hero.block');
  const picture = heroBlock?.querySelector('picture');
  const heading = heroBlock?.querySelector('h1');

  // Ensure proper handling of missing elements
  const contentRow = [picture || document.createTextNode(''), heading || document.createTextNode('')];

  // Organize table rows
  const cells = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}