const fs = require('fs');
const required = ['index.html', 'styles.css'];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`${file} is missing`);
}
const html = fs.readFileSync('index.html', 'utf8');
const normalizedHtml = html.toLocaleUpperCase('fr-FR');
for (const text of ['BRUIT PARASITE', 'CANDY BOX', 'MARTUS ET LA MÉLODIE DES ABEILLES', 'LE COLLECTIF']) {
  if (!normalizedHtml.includes(text)) throw new Error(`Missing required copy: ${text}`);
}
console.log('Static site files validated.');
