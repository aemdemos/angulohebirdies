/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the relevant content from the input element dynamically
  const columnsWrapper = element.querySelector(':scope > .columns-wrapper');
  const columnsBlock = columnsWrapper?.querySelector(':scope > .columns');
  const immediateChildren = columnsBlock?.querySelectorAll(':scope > div');

  if (!columnsBlock || !immediateChildren || immediateChildren.length < 2) {
    // Handle edge case: Missing required structure
    console.warn('Invalid structure detected');
    return null;
  }

  // Extract headers and content components dynamically
  const headerElement = immediateChildren[0].querySelector(':scope > div > h2');
  const textElement = immediateChildren[0].querySelector(':scope > div > p');
  const pictureElement = immediateChildren[1]?.querySelector(':scope > picture img');

  // Edge case handling
  const headerRow = ['Columns (columns6)']; // Exact header row match

  // Content rows with dynamic extraction
  const contentRow1 = [headerElement, textElement].filter(Boolean); // Filter out empty elements
  const contentRow2 = [pictureElement].filter(Boolean);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow1,
    contentRow2,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
  return blockTable;
}