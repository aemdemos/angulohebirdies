/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed (embedVideo1)'];

  // Extract image from the <picture> tag
  const picture = element.querySelector(':scope > div > div > p > picture');
  const image = picture ? picture.querySelector('img') : null;

  // Extract links with meaningful text content and format them as list items
  const linkElements = Array.from(
    element.querySelectorAll(':scope > div > div > ul > li > a')
  ).map(link => {
    const href = link.getAttribute('href');
    const text = link.textContent.trim();
    if (href && text) {
      const anchor = document.createElement('a');
      anchor.setAttribute('href', href);
      anchor.textContent = text;
      const listItem = document.createElement('li');
      listItem.appendChild(anchor);
      return listItem;
    }
    return null;
  }).filter(link => link);

  const linksList = document.createElement('ul');
  linksList.append(...linkElements);

  // Create the table content row with properly formatted links list
  const contentRow = [image, linksList];

  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}