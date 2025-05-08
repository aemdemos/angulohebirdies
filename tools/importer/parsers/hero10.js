/* global WebImporter */
export default function parse(element, { document }) {
  // Create the section break
  const hr = document.createElement('hr');

  // Extract the Hero section
  const heroSection = element.querySelector('.hero-container');
  const heroImage = heroSection.querySelector('img');
  const heroTitle = heroSection.querySelector('h1');

  const heroHeader = document.createElement('strong');
  heroHeader.textContent = 'Hero';

  const heroCells = [
    [heroHeader],
    [heroImage ? heroImage.cloneNode(true) : '', heroTitle ? heroTitle.cloneNode(true) : ''],
  ];
  const heroTable = WebImporter.DOMUtils.createTable(heroCells, document);

  // Extract the Tournament section
  const tournamentSection = element.querySelector('.tournament-container');
  const tournamentTitle = tournamentSection.querySelector('h2');
  const tournamentContent = Array.from(tournamentSection.querySelectorAll('p')).map(p => p.cloneNode(true));
  const tournamentEntries = Array.from(tournamentSection.querySelectorAll('.tournament.block > div')).map(entry => {
    const entryContent = Array.from(entry.children).map(child => child.cloneNode(true));
    return entryContent;
  });

  const tournamentHeader = document.createElement('strong');
  tournamentHeader.textContent = 'Tournament';

  // Combine all content into a single cell for the Tournament table
  const tournamentCellContent = [
    tournamentTitle ? tournamentTitle.cloneNode(true) : '',
    ...tournamentContent,
    ...tournamentEntries.flat(),
  ];

  const tournamentCells = [
    [tournamentHeader],
    [tournamentCellContent],
  ];
  const tournamentTable = WebImporter.DOMUtils.createTable(tournamentCells, document);

  // Replace the original element with the corrected structure
  element.replaceWith(hr, heroTable, tournamentTable);
}