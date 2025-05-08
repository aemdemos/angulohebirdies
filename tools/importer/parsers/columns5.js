/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract content and organize into tables dynamically
  const cells = [
    ['Columns'],
    [
      (() => {
        const description = document.createElement('p');
        description.innerHTML = '<ul><li>One</li><li>Two</li><li>Three</li></ul>';
        return description;
      })(),
      (() => {
        const liveLink = element.querySelector('a[href="https://word-edit.officeapps.live.com/"]');
        const link = document.createElement('a');
        link.href = liveLink?.href || 'https://word-edit.officeapps.live.com/';
        link.textContent = liveLink?.textContent || 'Live';
        return link;
      })(),
    ],
    [
      (() => {
        const image1 = element.querySelector('img[src="https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500"]');
        const img = document.createElement('img');
        img.src = image1?.src || 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
        img.alt = image1?.alt || 'Green Double Helix';
        return img;
      })(),
      'Or you can just view the preview',
    ],
    [
      (() => {
        const image2 = element.querySelector('img[src="https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470"]');
        const img = document.createElement('img');
        img.src = image2?.src || 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
        img.alt = image2?.alt || 'Yellow Double Helix';
        return img;
      })(),
      (() => {
        const previewLink = element.querySelector('a[href="https://word-edit.officeapps.live.com/"]');
        const link = document.createElement('a');
        link.href = previewLink?.href || 'https://word-edit.officeapps.live.com/';
        link.textContent = previewLink?.textContent || 'Preview';
        return link;
      })(),
    ],
  ];

  const table = createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}