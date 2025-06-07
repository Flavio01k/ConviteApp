const express = require('express');
const cors = require('cors');
const { gerarPdfConvite } = require('./gerador');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/gerar-pdf', async (req, res) => {
  if (!req.body.nome1) {
    return res.status(400).send('Insira o nome');
  }

  try {
    const { nome1 } = req.body;
    const pdfBuffer = await gerarPdfConvite(nome1);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="convite.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error('Erro ao gerar PDF:', err);
    res.status(500).send('Erro ao gerar PDF');
  }
});


app.listen(3000, () => console.log('Backend rodando na porta 3000'));
