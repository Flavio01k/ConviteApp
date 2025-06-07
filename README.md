## Convite PDF Generator
Aplicação web para gerar convites personalizados em PDF usando LaTeX. O cliente pode inserir nomes dos convidados e receber um convite PDF estilizado, com fundo colorido e nomes posicionados.

# Tecnologias usadas
Frontend: React + Vite + Tailwind CSS 

Backend: Node.js API para gerar arquivo  e pdf-lib

Base de dados: MySQL  para armazenar dados dos convites

Funcionalidades
Interface web para cadastro de nomes convidados

Backend gera dinamicamente arquivo .pdf

PDF gerado pode ser baixado ou enviado via email/WhatsApp (integração futura)

Armazenamento dos convites gerados e dados no banco

para rodar o codigo

```
npm install canvas pdf-lib
npm install pdf-lib express

npm run dev

```