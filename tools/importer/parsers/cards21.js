/* global WebImporter */
export default function parse(element, { document }) {
  // Fix header row to include <strong> tag explicitly
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards (cards21)';

  const rows = Array.from(element.querySelectorAll(':scope > div')).map((card) => {
    // Extract image element
    const imageElement = card.querySelector('picture');

    // Handle any src attributes other than images
    Array.from(card.querySelectorAll('[src]:not(img)')).forEach((srcEl) => {
      const link = document.createElement('a');
      link.href = srcEl.getAttribute('src');
      link.textContent = srcEl.getAttribute('src');
      srcEl.replaceWith(link);
    });

    // Extract text content
    const textContentContainer = card.querySelector('div:last-of-type');

    // Validation for missing data
    const validImage = imageElement ? imageElement : document.createElement('div');
    const validTextContent = textContentContainer ? textContentContainer : document.createElement('div');

    return [validImage, validTextContent];
  });

  const cells = [headerRow, ...rows];

  // Create table using WebImporter helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}