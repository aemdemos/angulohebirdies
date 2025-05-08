/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all unique image elements within the carousel
  const images = Array.from(element.querySelectorAll('picture img'));
  const uniqueImages = Array.from(new Set(images.map(img => img.src))).map(src => 
    images.find(img => img.src === src)
  );

  const rows = uniqueImages.map((img) => {
    const imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.alt = img.alt;
    return [imageElement];
  });

  const headerRow = ['Carousel'];
  const cells = [headerRow, ...rows];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}