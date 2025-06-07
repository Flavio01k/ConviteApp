const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function gerarPdfConvite(nome1, nome2) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  page.drawText('Convite Especial', { x: 50, y: 350, size: 24, font, color: rgb(0, 0, 0) });
  page.drawText(`${nome1} & ${nome2}`, { x: 50, y: 250, size: 18, font, color: rgb(0, 0, 0) });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { gerarPdfConvite };

/*
caso eu queira uma fonte na net
const response = await fetch('https://example.com/minha-fonte.ttf');
const fontBytes = await response.arrayBuffer();
const customFont = await pdfDoc.embedFont(fontBytes);
 */