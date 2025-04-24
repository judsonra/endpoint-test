const { testarURLs } = require('./fetcher');
const api = require('./api');
const { intervalo } = require('./config');

const express = require('express');
const servidor = express();

servidor.use('/', api);
const porta = 3000;
servidor.listen(porta, () => console.log(`API rodando em http://localhost:${porta}`));

setInterval(() => {
  console.log('Executando testes HTTPS...');
  testarURLs();
}, intervalo);
