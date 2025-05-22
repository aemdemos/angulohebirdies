/* global WebImporter */
export default function parse(element, { document }) {
  // Extract immediate child divs
  const blocks = Array.from(element.querySelectorAll(':scope > div'));

  // Validate if there are three blocks
  if (blocks.length !== 3) {
    console.error('Expected 3 blocks in the footer, found:', blocks.length);
    return;
  }

  const [logoBlock, linksBlock, socialMediaBlock] = blocks;

  // Extract logo
  const logoImage = logoBlock.querySelector('img');

  // Extract links
  const linksList = linksBlock.querySelector('ul');
  const linksParagraph = linksBlock.querySelector('p');

  // Extract social media links
  const socialMediaList = socialMediaBlock.querySelector('ul');

  // Construct table
  const cells = [
    ['Columns (columns1)'],
    [
      logoImage,
      [linksList, linksParagraph],
      socialMediaList,
    ],
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}