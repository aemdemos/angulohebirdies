/* global WebImporter */
export default function parse(element, { document }) {
    // Extract header row for the table
    const headerRow = ['Columns (columns14)'];

    // Extract the main content from the section
    const sectionWrapper = element.querySelector(':scope > .default-content-wrapper');
    const sectionContent = sectionWrapper.cloneNode(true);

    // Extract the cards wrapper
    const cardsWrapper = element.querySelector(':scope > .cards-wrapper');

    // Extract individual card elements
    const cards = Array.from(cardsWrapper.querySelectorAll(':scope > .cards > ul > li')).map(card => {
        const contentArray = [];

        // Extract card image
        const imageElement = card.querySelector('.cards-card-image img');
        if (imageElement) {
            contentArray.push(imageElement);
        }

        // Extract card body content
        const cardBody = card.querySelector('.cards-card-body');
        if (cardBody) {
            contentArray.push(cardBody);
        }

        // Extract callout overlay link
        const overlayButton = card.querySelector('.callout-overlay-button');
        if (overlayButton) {
            const linkElement = document.createElement('a');
            linkElement.href = overlayButton.href;
            linkElement.textContent = overlayButton.textContent;
            contentArray.push(linkElement);
        }

        return contentArray;
    });

    // Combine section and cards into a single table row
    const tableRows = [
        [sectionContent],
        ...cards.map(cardContent => [cardContent])
    ];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...tableRows], document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}