const fs = require('fs');
const required = ['index.html', 'spectacles.html', 'styles.css'];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`${file} is missing`);
}
const html = required.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const normalizedHtml = html.toLocaleUpperCase('fr-FR');
for (const text of ['BRUIT PARASITE', 'CANDY BOX', 'MARIUS ET LA MÉLODIE DES ABEILLES', 'HORS-PISTE', 'LE COLLECTIF']) {
  if (!normalizedHtml.includes(text)) throw new Error(`Missing required copy: ${text}`);
}
console.log('Static site files validated.');
