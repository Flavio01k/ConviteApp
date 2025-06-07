const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function gerarPdfConvite(nome1, nome2) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const page = pdfDoc.addPage([600, 400]);

  // Carrega imagem de fundo
  const jpgImageBytes = fs.readFileSync('../src/assets/fundo.jpg');
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);

  page.drawImage(jpgImage, {
    x: 0,
    y: 0,
    width: 600,
    height: 400,
  });

  // Carrega e embute a fonte Playfair Display
  const fontBytes = fs.readFileSync('../src/assets/PlayfairDisplay-VariableFont_wght.ttf');
  const customFont = await pdfDoc.embedFont(fontBytes);

  
  // Desenha os textos com a fonte customizada
  page.drawText('Convite Especial', {
    x: 50,
    y: 350,
    size: 24,
    font: customFont,
    color: rgb(1, 1, 1), // branco
  });

  page.drawText(`${nome1} & ${nome2}`, {
    x: 50,
    y: 250,
    size: 18,
    font: customFont,
    color: rgb(0, 0, 0), // preto
  });

  // Link clicável
  const linkText = 'Clique aqui para mais detalhes';
  const linkX = 50;
  const linkY = 200;
  const linkSize = 14;

  page.drawText(linkText, {
    x: linkX,
    y: linkY,
    size: linkSize,
    font: customFont,
    color: rgb(0, 0, 1), // azul
    link: 'https://www.exemplo.com',
  });
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { gerarPdfConvite };
