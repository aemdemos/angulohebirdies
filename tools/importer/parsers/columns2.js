/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row with exact match
  const headerRow = ['Columns (columns2)'];

  // Extract content dynamically from the element
  const navBrand = element.querySelector('.nav-brand');
  const navSections = element.querySelector('.nav-sections');
  const navTools = element.querySelector('.nav-tools');

  // Ensure all extracted elements are valid (not null)
  const navBrandContent = navBrand ? navBrand : document.createTextNode('');
  const navSectionsContent = navSections ? navSections : document.createTextNode('');
  const navToolsContent = navTools ? navTools : document.createTextNode('');

  // Build rows dynamically (header and content rows)
  const rows = [
    headerRow, // Header row as specified
    [navBrandContent, navSectionsContent, navToolsContent], // Content row
  ];

  // Create the block table using the WebImporter.DOMUtils helper function
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}