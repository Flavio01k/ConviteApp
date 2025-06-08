const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function gerarPdfConvite(nome1, nome2) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const page = pdfDoc.addPage([2000, 1334]);

  // Carrega imagem de fundo
  const pngImageBytes = fs.readFileSync('../src/assets/convite.png');
  const pngImage = await pdfDoc.embedPng(pngImageBytes);

  page.drawImage(pngImage, {
    x: 0,
    y: 0,
    width: 2000,
    height: 1334,
  });

  // Carrega e embute a fonte Playfair Display
  const fontBytes = fs.readFileSync('../src/assets/PlayfairDisplay-Italic-VariableFont_wght.ttf');
  const customFont = await pdfDoc.embedFont(fontBytes);

  
  // Desenha os textos com a fonte customizada
  // page.drawText('Convite Especial', {
  //   x: 50,
  //   y: 350,
  //   size: 24,
  //   font: customFont,
  //   color: rgb(1, 1, 1), // branco
  // });

const texto = `${nome1}`;
const xInicio = 150;
const xFim = 1136;
const larguraArea = xFim - xInicio;
const tamanhoFonte = 100;

const larguraTexto = customFont.widthOfTextAtSize(texto, tamanhoFonte);
const xCentralizado = xInicio + (larguraArea / 2) - (larguraTexto / 2);

page.drawText(texto, {
  x: xCentralizado,
  y: 540,
  size: tamanhoFonte,
  font: customFont,
  color: rgb(1, 1, 1),
  link: 'https://convite-lizney.vercel.app/', // branco
});

  // // Link clicável
  // const linkText = 'Clique aqui para mais detalhes';
  // const linkX = 50;
  // const linkY = 200;
  // const linkSize = 14;

  // page.drawText(linkText, {
  //   x: linkX,
  //   y: linkY,
  //   size: linkSize,
  //   font: customFont,
  //   color: rgb(0, 0, 1), // azul
  //   link: 'https://www.exemplo.com',
  // });
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { gerarPdfConvite };
