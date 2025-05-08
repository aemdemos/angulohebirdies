/* global WebImporter */
export default function parse(element, { document }) {
  // Create an HR element for section break
  const hr = document.createElement('hr');

  // Extract the footer image
  const imageElement = element.querySelector('picture img');
  const image = imageElement ? imageElement.cloneNode(true) : null;

  // Extract the email contact
  const emailElement = element.querySelector('a[href^="mailto:"]');
  const email = emailElement ? emailElement.cloneNode(true) : null;

  // Extract the copyright text
  const copyrightElement = element.querySelector('p');
  const copyrightText = copyrightElement ? copyrightElement.textContent.trim() : null;

  // Extract the links
  const linkItems = element.querySelectorAll('ul li a');
  const links = Array.from(linkItems).map(link => link.cloneNode(true));

  // Prepare the data for the table
  const cells = [['Footer']]; // Ensure header matches example structure

  if (image) cells.push([image]);
  if (email) cells.push([email]);
  if (copyrightText) cells.push([copyrightText]);
  if (links.length) links.forEach(link => cells.push([link]));

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with new content
  element.replaceWith(hr, table);
}