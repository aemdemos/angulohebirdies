/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row
  const headerRow = ['Columns (columns6)'];

  // Extract relevant content grouped by semantics
  const rows = [];

  // Group Founding Partners content
  const foundingPartnersHeader = element.querySelector('#founding-partners')?.cloneNode(true);
  const foundingPartnersImage = element.querySelector('img[src*="media_116848be0cb04650864afb44f3f1a9b90472cec3f.jpeg"]')?.cloneNode(true);
  const foundingPartnersText = element.querySelector('#phil-and-amy-mickelson')?.nextElementSibling?.cloneNode(true);
  rows.push([foundingPartnersHeader, foundingPartnersImage, foundingPartnersText]);

  // Group PGA Tour content
  const pgaTourHeader = element.querySelector('#pga-tour')?.cloneNode(true);
  const pgaTourImage = element.querySelector('img[src*="media_198223786c54f7909d6a7d17c3a02c51d12237598"]')?.cloneNode(true);
  const pgaTourText = element.querySelector('#pga-tour')?.nextElementSibling?.cloneNode(true);
  rows.push([pgaTourHeader, pgaTourImage, pgaTourText]);

  // Group TPC Network content
  const tpcNetworkHeader = element.querySelector('#tpc-network')?.cloneNode(true);
  const tpcNetworkImage = element.querySelector('img[src*="media_1fdb854af615d918b41b55cf717a84cf9ad8e088d"]')?.cloneNode(true);
  const tpcNetworkText = element.querySelector('#tpc-network')?.nextElementSibling?.cloneNode(true);
  rows.push([tpcNetworkHeader, tpcNetworkImage, tpcNetworkText]);

  // Group 4 Star Partners content
  const fourStarHeader = element.querySelector('#star-partners')?.cloneNode(true);
  const fourStarImage = element.querySelector('img[src*="media_1da8160ff6a877ee5cf2e2354276da77dbbf906dc"]')?.cloneNode(true);
  rows.push([fourStarHeader, fourStarImage]);

  // Group 2 Star Partners content
  const twoStarHeader = element.querySelector('#star-partners-2')?.cloneNode(true);
  const twoStarImages = Array.from(element.querySelectorAll('img[src*="media_156838ff8a2f9e9a1caeeffbe9a5f040c39a63ca5"], img[src*="media_1243a8f033de6d1c48f3651d4341c45bdf6fb60e2"], img[src*="media_12b9569aa794be77633de3ff026a0b93377ce6854"]'));
  rows.push([twoStarHeader, twoStarImages]);

  // Group 1 Star Partners content
  const oneStarHeader = element.querySelector('#star-partners-3')?.cloneNode(true);
  const oneStarText = element.querySelector('#star-partners-3')?.nextElementSibling?.cloneNode(true);
  rows.push([oneStarHeader, oneStarText]);

  // Group Become a Partner content
  const becomePartnerHeader = element.querySelector('#become-a-birdies-for-the-brave-partner')?.cloneNode(true);
  const becomePartnerText = element.querySelector('#become-a-birdies-for-the-brave-partner')?.nextElementSibling?.cloneNode(true);
  rows.push([becomePartnerHeader, becomePartnerText]);

  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}