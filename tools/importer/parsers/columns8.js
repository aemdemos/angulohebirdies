/* global WebImporter */
export default function parse(element, { document }) {
    // Create the header row
    const headerRow = ['Columns (columns8)'];

    // Extract relevant content dynamically
    const columns = [];

    // Get top-level children of the element
    const children = element.querySelectorAll(':scope > div');

    children.forEach((child) => {
        const content = [];

        // Extract images
        const images = child.querySelectorAll('img');
        images.forEach((img) => content.push(img));

        // Extract paragraphs or other inline text
        const paragraphs = child.querySelectorAll('p');
        paragraphs.forEach((p) => content.push(p));

        // Extract links (if applicable)
        const links = child.querySelectorAll('a[href]');
        links.forEach((link) => content.push(link));

        // Add content to columns
        columns.push(content);
    });

    // Organize into table rows
    const cells = [
        headerRow,
        ...columns.map((content) => [content])
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the block
    element.replaceWith(block);
}