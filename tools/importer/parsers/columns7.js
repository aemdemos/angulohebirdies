/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const cells = [];

  // Extract and structure content for the first column
  const firstColumnContent = [];
  const navSections = element.querySelector('.nav-sections ul');
  if (navSections) {
    const list = document.createElement('ul');
    navSections.querySelectorAll('li').forEach((navItem) => {
      const li = document.createElement('li');
      li.textContent = navItem.textContent.trim();
      list.appendChild(li);
    });
    firstColumnContent.push(list);
  }

  const donateButton = element.querySelector('.nav-tools .button.primary');
  if (donateButton) {
    const donateLink = document.createElement('a');
    donateLink.href = donateButton.href;
    donateLink.textContent = donateButton.textContent.trim();
    firstColumnContent.push(donateLink);
  }

  cells.push([firstColumnContent]);

  // Extract and structure content for the second column
  const brandImage = element.querySelector('.nav-brand picture img');
  if (brandImage) {
    const imgElement = document.createElement('img');
    imgElement.src = brandImage.src;
    imgElement.alt = brandImage.alt || '';
    cells.push([imgElement]);
  }

  // The third column dynamically extracted from original HTML
  const navHamburgerIcon = element.querySelector('.nav-hamburger-icon');
  const thirdColumnContent = [];
  if (navHamburgerIcon) {
    const iconClone = navHamburgerIcon.cloneNode(true);
    thirdColumnContent.push(iconClone);
  }

  if (thirdColumnContent.length > 0) {
    cells.push(thirdColumnContent);
  }

  // Create the table structure and replace the original element
  const block = WebImporter.DOMUtils.createTable([headerRow, ...cells], document);

  element.replaceWith(block);
}