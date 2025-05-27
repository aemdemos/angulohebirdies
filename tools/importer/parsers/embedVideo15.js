/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed (embedVideo15)'];

  // Extracting image element
  const image = element.querySelector('img');

  // Extracting video link from iframe src
  let videoLink;
  const iframe = element.querySelector('iframe');
  if (iframe) {
    videoLink = document.createElement('a');
    videoLink.href = iframe.src;
    videoLink.textContent = iframe.src;
  }

  // Constructing table rows dynamically
  const cells = [
    headerRow,
    [image, videoLink || ''] // Include an empty cell if the iframe does not exist
  ];

  // Creating the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(blockTable);
}