const fs = require('fs');
const path = require('path');

(async () => {
  fs.readFile('geo.json', 'utf-8', async (err, data) => {
    const jsonData = JSON.parse(data);
    for (let i = 0; i < 2; ++i) {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${jsonData[i].lat}&lon=${jsonData[i].lon}&appid=957644072ea706ae572a3a7bc8e9a2f0`;

      const res = await fetch(url);
      const json_for_writing = await res.json();

      const filePath = path.join(__dirname, 'weather.json');
      fs.writeFile(filePath, JSON.stringify(json_for_writing, null, 4), (err) => {
      });
    }
  })
})();
