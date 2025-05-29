/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the hero block content dynamically
  const heroWrapper = element.querySelector(':scope > .hero-wrapper > .hero');

  // Extract picture and heading
  const picture = heroWrapper ? heroWrapper.querySelector('picture') : null;
  const heading = heroWrapper ? heroWrapper.querySelector('h1') : null;

  // Ensure both picture and heading are included dynamically
  const pictureElement = picture || document.createTextNode('');
  const headingElement = heading || document.createTextNode('');

  // Create the table structure dynamically based on example
  const headerRow = ['Hero (hero3)'];
  const contentRow = [[pictureElement, headingElement]];

  // Combine elements into a single cell for the second row
  const combinedCell = [pictureElement, headingElement];

  const block = WebImporter.DOMUtils.createTable([headerRow, [combinedCell]], document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}