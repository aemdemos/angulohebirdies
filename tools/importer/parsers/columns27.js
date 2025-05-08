/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create links from elements with src attributes
  const createLinkFromSrc = (src, text) => {
    if (!src) return null;
    const link = document.createElement('a');
    link.href = src;
    link.textContent = text || src;
    return link;
  };

  // Helper function to extract text content from an element
  const extractTextContent = (el) => {
    return el.textContent.trim();
  };

  // Helper function to extract images
  const extractImage = (imgElement) => {
    const img = document.createElement('img');
    img.src = imgElement.src;
    img.alt = imgElement.alt;
    img.width = imgElement.width;
    img.height = imgElement.height;
    return img;
  };

  // Extracting different sections of the header element
  const navBrand = element.querySelector('.nav-brand picture img');
  const navSections = element.querySelector('.nav-sections ul');
  const navTools = element.querySelector('.nav-tools .button-container a');

  // Parse the nav-brand section
  const brandImage = navBrand ? extractImage(navBrand) : null;

  // Parse the nav-sections list
  const navLinks = navSections ? Array.from(navSections.querySelectorAll('li a')).map((link) => createLinkFromSrc(link.href, extractTextContent(link))) : [];

  // Parse the donate button
  const donateButton = navTools ? createLinkFromSrc(navTools.href, extractTextContent(navTools)) : null;

  // Creating table rows for the header block
  const tableRows = [
    ['Columns'], // Corrected header row to match the example exactly
    [brandImage],
    navLinks,
    donateButton ? [donateButton] : []
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element with the new block
  element.replaceWith(block);
}