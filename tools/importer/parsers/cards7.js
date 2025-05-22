/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (cards7)'];
    const rows = [headerRow];

    const cardElements = element.querySelectorAll(':scope > div > div');

    cardElements.forEach((card) => {
        const imageContainer = card.querySelector(':scope > div:first-child picture img');
        const textContainer = card.querySelector(':scope > div:last-child');

        const image = imageContainer ? imageContainer : null;
        const text = textContainer ? textContainer : null;

        const row = [image, text];
        rows.push(row);
    });

    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
}