const { spawn } = require('child_process');

function searchHandymen(query, nCid) {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['./python_files/recommendWithFilter.py']);

    let data = '';

    python.stdout.on('data', (chunk) => {
      data += chunk;
    });

    python.stderr.on('data', (chunk) => {
      console.error(chunk.toString());
    });

    python.on('close', (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      } else {
        resolve(JSON.parse(data));
      }
    });

    const separator = ";";

    python.stdin.write(`${query}${separator}${nCid}\n`);

    python.stdin.end();
  });
}

function searchBySimOnly(query, filePath) {
  return new Promise((resolve, reject) => {
    const python = spawn('python', [filePath]);

    let data = '';

    python.stdout.on('data', (chunk) => {
      data += chunk;
    });

    python.stderr.on('data', (chunk) => {
      console.error(chunk.toString());
    });

    python.on('close', (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      } else {
        resolve(JSON.parse(data));
      }
    });

    python.stdin.write(`${query}\n`);

    python.stdin.end();
  });
}

// function for calculating distance between coordinates
function distance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);  // deg2rad below
  const dLon = deg2rad(lon2-lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c * 1000; // Distance in m
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
 

module.exports = { searchHandymen, searchBySimOnly, distance, deg2rad }