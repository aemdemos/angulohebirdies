/* global WebImporter */

export default function parse(element, { document }) {
  // Define the header row as per the example
  const headerRow = ['Embed (embedVideo11)'];

  // Extract the image from the element
  const image = element.querySelector('img');

  // Find URLs from elements that have an 'href' attribute but exclude images
  const urls = Array.from(element.querySelectorAll('a[href]')).map(link => {
    const clone = document.createElement('a');
    clone.href = link.href;
    clone.textContent = link.href;
    return clone;
  });

  // Combine the content into a single cell for the second row
  const combinedCell = document.createElement('div');
  if (image) combinedCell.appendChild(image);
  urls.forEach(link => combinedCell.appendChild(link));

  // Create the table cells
  const cells = [
    headerRow,
    [combinedCell]
  ];

  // Generate the table using the helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}