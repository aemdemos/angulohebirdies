/* global WebImporter */
export default function parse(element, { document }) {
  // Validate that the element exists
  if (!element || !document) return;

  // Extract the header row, ensuring it matches the example
  const headerRow = ['Hero (hero4)'];

  // Find the image element and its src attribute within the hero block
  const imageContainer = element.querySelector(':scope picture');
  const image = imageContainer ? imageContainer.querySelector('img') : null;
  const validImage = image && image.src ? image : null;

  // Find the title element within the hero block and extract its text content
  const title = element.querySelector(':scope h1');
  const titleText = title ? document.createElement('h1') : null;
  if (titleText && title.textContent) {
    titleText.textContent = title.textContent.trim();
  }

  // Create the content row combining all relevant content into a single cell
  const contentRow = [
    [validImage, titleText].filter(Boolean) // Filter out any undefined/null elements
  ];

  // Create the table cells dynamically
  const cells = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}