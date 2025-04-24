
const express = require('express');
const fs = require('fs');
const app = express();


app.get('/consulta', (req, res) => {
  const dominio = req.query.dominio;
  if (!dominio) return res.status(400).send('Parâmetro "dominio" é obrigatório.');

  if (!fs.existsSync('./urls.json')) return res.status(404).send('Base de dados não encontrada.');

  const urls = JSON.parse(fs.readFileSync('./urls.json'));

  const item = urls.find(e => `${e.subdominio}${e.endpoint}`.startsWith(dominio));

  if (item && item.codigo !== undefined) {
    res.send(item.codigo.toString());
  } else {
    res.status(404).send('Domínio não encontrado ou ainda sem resposta.');
  }
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const CHAVE_FIXA = "12ede3fa-42e8-48d8-849c-da7280940048";


app.post('/atualiza', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token !== process.env.CHAVE_FIXA) {
    return res.status(401).send('Token inválido');
  }

  const { subdominio, codigo } = req.body;

  if (!subdominio || typeof codigo !== 'number') {
    return res.status(400).send('Campos "subdominio" e "codigo" são obrigatórios');
  }

  const path = './urls.json';
  if (!fs.existsSync(path)) {
    return res.status(404).send('Base de dados não encontrada.');
  }

  const urls = JSON.parse(fs.readFileSync(path));
  const item = urls.find(e => e.subdominio === subdominio);

  if (!item) {
    return res.status(404).send('Subdomínio não encontrado.');
  }

  item.codigo = codigo;
  fs.writeFileSync(path, JSON.stringify(urls, null, 2));
  res.send('Código atualizado com sucesso.');
});



module.exports = app;
