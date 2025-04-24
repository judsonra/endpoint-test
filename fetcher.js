const fs = require('fs');
const axios = require('axios');
const { timeout } = require('./config');

async function carregarURLs() {
  const raw = fs.readFileSync('./urls.json');
  return JSON.parse(raw);
}

function salvarURLs(data) {
  fs.writeFileSync('./urls.json', JSON.stringify(data, null, 2));
}

async function testarURLs() {
  const urls = await carregarURLs();

  for (const item of urls) {
    const url = `${item.subdominio}${item.endpoint}`;
    try {
      const response = await axios.get(url, { timeout });
      item.codigo = response.status;
    } catch (err) {
      item.codigo = 500;
    }
  }

  salvarURLs(urls);
}

module.exports = { testarURLs };
