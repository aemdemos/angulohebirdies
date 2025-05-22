/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row to match example structure
  const headerRow = ['Columns (columns19)'];

  // Extract immediate children of the columns block
  const columns = Array.from(element.querySelectorAll(':scope > div > div'));

  const rows = columns.map((col) => {
    const components = [];

    // Extract heading (if it exists)
    const heading = col.querySelector('h2');
    if (heading) {
      components.push([heading]);
    }

    // Extract paragraph text (if any)
    const paragraphs = col.querySelectorAll('p');
    paragraphs.forEach((p) => components.push([p]));

    // Extract images
    const images = col.querySelectorAll('img');
    images.forEach((img) => components.push([img]));

    // Extract other elements with 'src' attribute converted to links
    const srcElements = col.querySelectorAll('[src]');
    srcElements.forEach((srcElement) => {
      if (srcElement.tagName !== 'IMG') {
        const link = document.createElement('a');
        link.href = srcElement.src;
        link.textContent = srcElement.src;
        components.push([link]);
      }
    });

    // Filter out empty elements or redundant nodes
    const filteredComponents = components.filter((component) => component[0]?.textContent || component[0]?.tagName === 'IMG');

    return filteredComponents;
  });

  const cells = [headerRow, ...rows.flat()];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}