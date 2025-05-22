/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (cards7)'];
    
    const rows = Array.from(element.querySelectorAll(':scope > div')).map((card) => {
        // Extract the image element
        const imageContainer = card.querySelector(':scope > div:first-child picture');
        const image = imageContainer ? imageContainer : null;

        // Extract text content
        const textContainer = card.querySelector(':scope > div:last-child');
        const title = textContainer.querySelector('strong');
        const description = textContainer.querySelector('br') ? textContainer.querySelector('br').nextSibling.textContent.trim() : '';
        const links = Array.from(textContainer.querySelectorAll('a')).map((link) => link);

        // Combine text components
        const textContent = [
            title,
            description,
            ...links
        ].filter(Boolean);

        return [image, textContent];
    });

    // Construct table
    const tableData = [headerRow, ...rows];
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the table
    element.replaceWith(table);
}