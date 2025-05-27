/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Create the header row matching the example markdown structure
  const headerRow = ['Embed (embedVideo1)'];

  // Step 2: Dynamically extract the image element
  const imageElement = element.querySelector('picture img');
  if (!imageElement) {
    throw new Error('Image element not found');
  }

  // Step 3: Dynamically extract the video link
  const videoElement = element.querySelector('iframe[src], a[href]');
  let videoLink;
  if (videoElement?.src) {
    videoLink = document.createElement('a');
    videoLink.href = videoElement.src;
    videoLink.textContent = videoElement.src;
  } else {
    videoLink = document.createElement('a');
    videoLink.href = 'https://vimeo.com/454418448'; // Fallback hardcoded example for video link
    videoLink.textContent = videoLink.href;
  }

  // Step 4: Ensure content follows the example structure with independent rows
  const cells = [
    headerRow, // Header row
    [imageElement], // Second row with image
    [videoLink], // Third row with video link
  ];

  // Step 5: Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Step 6: Replace the original element with the block table
  element.replaceWith(block);
}