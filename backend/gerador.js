const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function gerarPdfConvite(nome1, nome2) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const jpgImageBytes = fs.readFileSync('../src/assets/fundo.jpg'); // ou PNG com embedPng

  // Embutir a imagem no pdf
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);

  // Pega as dimensões da imagem
  const { width, height } = jpgImage.scale(1);

  // Desenha a imagem na página (como fundo)
  page.drawImage(jpgImage, {
    x: 0,
    y: 0,
    width: 600, // largura da página
    height: 400, // altura da página
  });


  // Desenha o texto
  page.drawText('Convite Especial', { x: 50, y: 350, size: 24, font, color: rgb(255/255, 255/255, 255/255) });
  page.drawText(`${nome1} & ${nome2}`, { x: 50, y: 250, size: 18, font, color: rgb(0/255, 0/255, 0/255) });

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