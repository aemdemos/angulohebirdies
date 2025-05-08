/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed'];

  // Extract the image dynamically
  const image = element.querySelector('img');

  // Attempt to extract a video link dynamically
  const videoLinkElement = element.querySelector('a[href*="vimeo"]');
  const videoLink = videoLinkElement ? videoLinkElement.href : null;

  // Handle gracefully if no video link exists
  if (!videoLink) {
    console.error('No video link found in the element.');
    const fallbackMessage = document.createElement('p');
    fallbackMessage.textContent = 'No video link available.';
    const contentRow = image ? [image, fallbackMessage] : [fallbackMessage];

    const cells = [
      headerRow, // Header row
      contentRow, // Content row
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(table);
    return;
  }

  const linkNode = document.createElement('a');
  linkNode.href = videoLink;
  linkNode.textContent = videoLink;

  // Prepare the content row dynamically
  const contentRow = image ? [image, linkNode] : [linkNode];

  const cells = [
    headerRow, // Header row
    contentRow, // Content row
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}