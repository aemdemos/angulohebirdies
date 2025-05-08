/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for the table
  const headerRow = ['Carousel'];

  // Extract individual slides from the element
  const slides = element.querySelectorAll('div > div');

  // Map slides to rows for the table, ensuring no duplicates or empty rows
  const rows = Array.from(slides).reduce((acc, slide) => {
    // Extract the image
    const imageContainer = slide.querySelector('.carousel-image img');
    if (!imageContainer || !imageContainer.src) {
      return acc; // Skip this slide if the image is missing
    }

    const imageSrc = imageContainer.src;
    // Prevent duplicate rows by checking if the image source already exists
    if (acc.find(row => row[0]?.src === imageSrc)) {
      return acc; // Skip this slide if duplicate
    }

    const image = document.createElement('img');
    image.src = imageSrc;

    // Extract the text content
    const textContainer = slide.querySelector('.carousel-text');
    const title = textContainer?.querySelector('h1, h2');
    const paragraphs = textContainer?.querySelectorAll('p:not(.button-container)');
    const linkContainer = textContainer?.querySelector('p.button-container a');

    const textContent = document.createElement('div');

    if (title) {
      const heading = document.createElement(title.tagName.toLowerCase());
      heading.textContent = title.textContent;
      textContent.appendChild(heading);
    }

    paragraphs?.forEach((p) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = p.textContent;
      textContent.appendChild(paragraph);
    });

    if (linkContainer && linkContainer.href && linkContainer.textContent) {
      const link = document.createElement('a');
      link.href = linkContainer.href;
      link.textContent = linkContainer.textContent;
      textContent.appendChild(link);
    }

    // Add this row to the accumulator
    acc.push([image, textContent]);
    return acc;
  }, []);

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}