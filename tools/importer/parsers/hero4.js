/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero4)'];

  // Extract the image element
  const imageContainer = element.querySelector(':scope picture');
  const image = imageContainer ? imageContainer.querySelector('img') : null;

  // Extract the heading
  const heading = element.querySelector(':scope h1');

  // Combine image and heading into a single cell for the second row
  const combinedContent = document.createElement('div');
  if (image) combinedContent.appendChild(image);
  if (heading) combinedContent.appendChild(heading);

  const contentRow = [combinedContent];

  const tableData = [
    headerRow,
    contentRow
  ];

  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(tableBlock);
}