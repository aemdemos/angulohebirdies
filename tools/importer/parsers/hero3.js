/* global WebImporter */
export default function parse(element, { document }) {
    // Dynamically extract content
    const picture = element.querySelector('picture');
    const heading = element.querySelector('h1');

    // Validate and combine extracted content into a single cell
    const combinedContent = document.createElement('div');
    if (picture) combinedContent.appendChild(picture);
    if (heading) combinedContent.appendChild(heading);

    // Create the table structure
    const cells = [
        ['Hero'], // Header row with exact text
        [combinedContent], // Single cell containing combined content (picture and heading)
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(block);
}