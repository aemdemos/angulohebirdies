/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (cardsNoImages8)'];
    const rows = [];

    const children = element.querySelectorAll(':scope > div');

    children.forEach((child) => {
        const image = child.querySelector('img');
        const textContainer = child.querySelector('div:last-child');

        const rowContent = [];

        if (image || textContainer) {
            const combinedContent = document.createElement('div');
            if (image) {
                combinedContent.appendChild(image);
            }
            if (textContainer) {
                combinedContent.appendChild(textContainer);
            }
            rowContent.push(combinedContent);
        }

        rows.push(rowContent);
    });

    const tableData = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(blockTable);
}