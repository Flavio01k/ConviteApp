
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

app.post('/gerar-pdf', async (req, res) => {
    const { nome1, nome2 } = req.body;
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    page.drawText('Convite Especial', {
        x: 50, y: 350,
        size: 24,
        font,
        color: rgb(0, 0, 0)
    });
    
    page.drawText(`${nome1} & ${nome2}`, {
        x: 50, y: 250,
        size: 18,
        font,
        color: rgb(0, 0, 0)
    });
    
    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);
});