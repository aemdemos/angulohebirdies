/* global WebImporter */
export default function parse(element, { document }) {
  const tables = [];

  // Extract and process the Hero section
  const heroSection = element.querySelector('.hero-container');
  if (heroSection) {
    const imageTag = heroSection.querySelector('img');
    const headingTag = heroSection.querySelector('h1');

    const heroContent = [];

    if (imageTag) {
      const image = document.createElement('img');
      image.src = imageTag.src;
      image.alt = imageTag.alt || '';
      heroContent.push(image);
    }

    if (headingTag) {
      const heading = document.createElement('h1');
      heading.textContent = headingTag.textContent;
      heroContent.push(heading);
    }

    const heroTable = WebImporter.DOMUtils.createTable([
      ['Hero'],
      [heroContent]
    ], document);

    tables.push(heroTable);
  }

  // Extract and process the Volunteer Opportunities section
  const volunteerSection = element.querySelector('h2');
  if (volunteerSection) {
    const volunteerHeading = volunteerSection.textContent;

    const volunteerImageTag = element.querySelector('.default-content-wrapper picture img');
    const volunteerParagraphs = element.querySelectorAll('.default-content-wrapper p');
    const volunteerLinks = element.querySelectorAll('.default-content-wrapper ul li a');

    const volunteerContent = [];

    const heading = document.createElement('h2');
    heading.textContent = volunteerHeading;
    volunteerContent.push(heading);

    if (volunteerImageTag) {
      const image = document.createElement('img');
      image.src = volunteerImageTag.src;
      image.alt = volunteerImageTag.alt || '';
      volunteerContent.push(image);
    }

    const combinedContent = document.createElement('div');
    volunteerParagraphs.forEach((paragraph) => {
      const trimmedText = paragraph.textContent.trim();
      if (trimmedText) {
        const paraDiv = document.createElement('div');
        paraDiv.textContent = trimmedText;
        combinedContent.appendChild(paraDiv);
      }
    });

    const linksDiv = document.createElement('div');
    volunteerLinks.forEach((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent;
      linksDiv.appendChild(a);
    });

    combinedContent.appendChild(linksDiv); // Group links with paragraphs
    volunteerContent.push(combinedContent);

    const volunteerTable = WebImporter.DOMUtils.createTable([
      ['Volunteer Opportunities'],
      [volunteerContent]
    ], document);

    tables.push(volunteerTable);
  }

  // Replace the original element with the generated tables
  element.replaceWith(...tables);
}