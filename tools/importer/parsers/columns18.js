/* global WebImporter */
export default function parse(element, { document }) {
  // Create section break
  const sectionBreak = document.createElement('hr');

  // Extract heading and content paragraphs
  const heading = element.querySelector('h2')?.textContent || '';
  const paragraphs = Array.from(element.querySelectorAll('p')).map((p) => p.outerHTML);

  // Extract cards
  const cards = Array.from(element.querySelectorAll('.cards-wrapper .cards ul li')).map((card) => {
    const image = card.querySelector('img');
    const imgElement = image ? document.createElement('img') : null;
    if (imgElement) {
      imgElement.src = image.src;
      imgElement.alt = image.alt;
    }

    const titleLink = card.querySelector('.cards-card-body strong a');
    const titleElement = titleLink
      ? Object.assign(document.createElement('a'), {
          href: titleLink.href,
          textContent: titleLink.textContent,
        })
      : null;

    const learnMoreLink = card.querySelector('.callout-overlay-button');
    const learnMoreElement = learnMoreLink
      ? Object.assign(document.createElement('a'), {
          href: learnMoreLink.href,
          textContent: learnMoreLink.textContent,
        })
      : null;

    return [imgElement, titleElement, learnMoreElement].filter(Boolean);
  });

  // Build independent tables for cards
  const cardTables = cards.map((card) => {
    const cardTableCells = [
      ['Cards'],
      [card],
    ];
    return WebImporter.DOMUtils.createTable(cardTableCells, document);
  });

  // Main table cells without nesting
  const mainTableCells = [
    ['Columns'], // Fixing header row to match example precisely
    [
      paragraphs.join(''),
    ],
  ];
  const mainTable = WebImporter.DOMUtils.createTable(mainTableCells, document);

  // Replace element with correct structure, ensuring no nesting
  element.replaceWith(sectionBreak, mainTable, ...cardTables);
}