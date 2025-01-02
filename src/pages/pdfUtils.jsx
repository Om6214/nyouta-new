// pdfUtils.js
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (textFields, images) => {
  const doc = new jsPDF();

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.backgroundColor = 'white';

    const imgElement = document.createElement('img');
    imgElement.src = img;
    imgElement.crossOrigin = 'anonymous';
    imgElement.style.position = 'absolute';
    imgElement.style.top = '0';
    imgElement.style.left = '0';

    await new Promise((resolve) => {
      imgElement.onload = () => {
        container.appendChild(imgElement);
        resolve();
      };
    });

    textFields.forEach(({ text, x, y, size, font }) => {
      const textElement = document.createElement('div');
      textElement.style.position = 'absolute';
      textElement.style.top = `${y}px`;
      textElement.style.left = `${x}px`;
      textElement.style.fontSize = `${size}px`;
      textElement.style.fontFamily = font;
      textElement.innerText = text;
      container.appendChild(textElement);
    });

    document.body.appendChild(container);
    const canvas = await html2canvas(container);
    const imgData = canvas.toDataURL('image/png');

    if (i > 0) {
      doc.addPage();
    }

    doc.addImage(imgData, 'PNG', 0, 0);
    document.body.removeChild(container);
  }

  doc.save('wedding-card.pdf');
};