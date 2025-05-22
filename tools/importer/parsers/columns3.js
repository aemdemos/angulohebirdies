/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns3)'];

  // Extract logo image
  const logoImage = element.querySelector('.nav-brand img');

  // Extract navigation links
  const navLinks = Array.from(element.querySelectorAll('.nav-sections li a')).map(link => link.cloneNode(true));

  // Extract donate button
  const donateButton = element.querySelector('.nav-tools .button-container a');

  // Create rows for the table
  const contentRow1 = [logoImage, navLinks];
  const contentRow2 = [
    'Donate',
    donateButton ? [donateButton.cloneNode(true)] : 'No Donate Button'
  ];

  const cells = [
    headerRow,
    contentRow1,
    contentRow2
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}