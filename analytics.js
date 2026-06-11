const fs = require('fs');

const csv = fs.readFileSync('sessions_lab12.csv', 'utf-8');
const lines = csv.trim().split('\n');
const headers = lines[0].split(',');

const data = lines.slice(1).map(line => {
  const values = line.split(',');
  return headers.reduce((obj, header, i) => {
    obj[header] = values[i];
    return obj;
  }, {});
});

const stats = {};
for (const row of data) {
  if (!stats[row.page]) stats[row.page] = { total: 0, bounced: 0 };
  stats[row.page].total++;
  if (row.bounce === "true") stats[row.page].bounced++;
}

console.log("B1. Bounce rate per strona:");
for (const page of ['home', 'about', 'form', 'confirm']) {
  if (stats[page]) {
    const bounceRate = (stats[page].bounced / stats[page].total * 100).toFixed(1);
    console.log(`${page}: ${bounceRate}% (${stats[page].bounced}/${stats[page].total})`);
  }
}
console.log("");


const formRows = data.filter(r => r.page === "form" && r.form_step_reached);
const totalForm = formRows.length;
console.log("B2. Drop-off formularza (Total forms: " + totalForm + "):");
let prevReached = totalForm;
for (let step = 1; step <= 4; step++) {
  const reached = formRows.filter(r => Number(r.form_step_reached) >= step).length;
  console.log(`Krok ${step}: ${(reached / totalForm * 100).toFixed(1)}% (${reached}/${totalForm})`);
}

for (let step = 1; step <= 3; step++) {
    const reachedCurrent = formRows.filter(r => Number(r.form_step_reached) >= step).length;
    const reachedNext = formRows.filter(r => Number(r.form_step_reached) >= step+1).length;
    const dropOff = reachedCurrent - reachedNext;
    console.log(`Drop-off na Krok ${step}: ${dropOff} users (${(dropOff/reachedCurrent*100).toFixed(1)}% of those who reached step ${step})`);
}
console.log("");

const freq = {};
for (const row of data) {
  if (row.element_clicked) {
    freq[row.element_clicked] = (freq[row.element_clicked] || 0) + 1;
  }
}
const topClicks = Object.entries(freq)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([element, count]) => ({ element, count }));

console.log("B3. Top 5 klikanych elementów:");
console.table(topClicks);
