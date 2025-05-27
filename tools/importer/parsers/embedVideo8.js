/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed (embedVideo8)'];

  // Extract image element
  const imageElement = element.querySelector('img');

  // Extract iframe src dynamically
  const iframeElement = element.querySelector('iframe');
  const videoLinkElement = document.createElement('a');
  if (iframeElement && iframeElement.src) {
    videoLinkElement.href = iframeElement.src;
    videoLinkElement.textContent = iframeElement.src;
  } else {
    videoLinkElement.href = '#';
    videoLinkElement.textContent = 'No video source';
  }

  const additionalLinks = Array.from(element.querySelectorAll('a')).map(link => {
    const clonedLink = document.createElement('a');
    clonedLink.href = link.href;
    clonedLink.textContent = link.textContent;
    return clonedLink;
  });

  const combinedCellContent = document.createElement('div');
  if (imageElement) combinedCellContent.appendChild(imageElement);
  combinedCellContent.appendChild(videoLinkElement);
  additionalLinks.forEach(link => combinedCellContent.appendChild(link));

  const cells = [
    headerRow,
    [combinedCellContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}