/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards']; // Header row from the example markdown structure

    const cells = [headerRow]; // Initialize the table rows with the header

    const cardList = element.querySelectorAll('.cards-card-body'); // Select all cards

    // Process each card
    cardList.forEach((card) => {
        const imageElement = card.previousElementSibling.querySelector('img'); // Get the associated image
        const image = imageElement ? document.createElement('img') : null;
        if (image) {
            image.src = imageElement.src;
            image.alt = imageElement.alt;
        }

        const titleElement = card.querySelector('h3');
        const title = titleElement ? titleElement.textContent : '';

        const descriptionElement = card.querySelector('p');
        const description = descriptionElement ? descriptionElement.textContent : '';

        const rowContent = [image, `${title}<br>${description}`];
        cells.push(rowContent);
    });

    // Create the table
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the table
    element.replaceWith(table);
}