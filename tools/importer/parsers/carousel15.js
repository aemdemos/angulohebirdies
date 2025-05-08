/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract image details
  const getImageNode = (pictureEl) => {
    const img = pictureEl.querySelector('img:not([loading="lazy"])');
    return img;
  };

  // Extract all carousel slides
  const slides = Array.from(element.querySelectorAll('.logos.block > div')); // Avoid lazy images duplication

  const cells = slides.map((slide) => {
    const picture = slide.querySelector('picture');
    const imgElement = getImageNode(picture);

    if (imgElement) {
      return [imgElement];
    }
    return null;
  }).filter(Boolean); // Filter out null values from empty rows

  const tableData = [
    ['Carousel'],
    ...cells
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Check if Section Metadata is required and handle it
  const sectionMetadataRequired = false; // Based on the example markdown structure
  if (sectionMetadataRequired) {
    const hr = document.createElement('hr');
    const metadataTable = WebImporter.DOMUtils.createTable([
      ['Section Metadata'],
      ['Key: Value'],
    ], document);

    element.replaceWith(hr, metadataTable, blockTable);
  } else {
    element.replaceWith(blockTable);
  }
}