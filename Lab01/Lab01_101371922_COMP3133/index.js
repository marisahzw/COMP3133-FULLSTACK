const fs = require('fs');
const csv = require('csv-parser');

const deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`${filePath} deleted`);
  }
};


deleteFileIfExists('canada.txt');
deleteFileIfExists('usa.txt');


fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
   
    if (row.country === 'Canada') {
      const canadaData = `country,year,population\n${row.country},${row.year},${row.population}\n`;
      fs.appendFileSync('canada.txt', canadaData);
    }


    if (row.country === 'United States') {
      const usaData = `country,year,population\n${row.country},${row.year},${row.population}\n`;
      fs.appendFileSync('usa.txt', usaData);
    }
  })
  .on('end', () => {
    console.log('Data processing complete.');
  });
