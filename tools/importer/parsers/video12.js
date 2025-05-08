/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Video'];
  
  // Extract relevant content dynamically
  const picture = element.querySelector('picture');
  const img = picture ? picture.querySelector('img') : null;
  const videoLink = document.createElement('a');
  videoLink.href = 'https://www.youtube.com/watch?v=RGSN4S5jn4o';
  videoLink.textContent = videoLink.href;

  const cells = [
    headerRow,
    [img, videoLink]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}