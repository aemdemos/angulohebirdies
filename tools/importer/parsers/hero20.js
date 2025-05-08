/* global WebImporter */
export default function parse(element, { document }) {
  const blocks = [];

  // Process Hero Block
  const hero = element.querySelector('.hero.block');
  if (hero) {
    const backgroundImage = hero.querySelector('picture img');
    const heading = hero.querySelector('h1');

    const heroCells = [
      ['Hero'], // Header row with plain text as per example
      [
        backgroundImage,
        heading,
      ],
    ];

    const heroBlock = WebImporter.DOMUtils.createTable(heroCells, document);
    blocks.push(heroBlock);
  }

  // Process Main Sections
  const sections = element.querySelectorAll('.section');
  sections.forEach((section) => {
    const sectionHeading = section.querySelector('h2');
    const paragraphs = section.querySelectorAll('p');
    const images = section.querySelectorAll('picture img');

    const contentCells = [];
    if (sectionHeading) {
      contentCells.push([sectionHeading.textContent]); // Header row with plain text as per example
    }
    paragraphs.forEach((paragraph) => {
      if (paragraph.textContent.trim()) { // Only include meaningful paragraphs
        contentCells.push([paragraph]);
      }
    });
    images.forEach((image) => {
      contentCells.push([image]);
    });

    if (contentCells.length > 0) {
      const sectionBlock = WebImporter.DOMUtils.createTable(contentCells, document);
      blocks.push(sectionBlock);
    }
  });

  // Append all blocks to document
  element.replaceWith(...blocks);
}