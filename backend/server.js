const express = require('express');
const cors = require('cors');
const { gerarPdfConvite } = require('./gerador');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/gerar-pdf', async (req, res) => {
  try {
    const { nome1, nome2 } = req.body;
    const pdfBuffer = await gerarPdfConvite(nome1, nome2);

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao gerar PDF');
  }
});

app.listen(3000, () => console.log('Backend rodando na porta 3000'));
