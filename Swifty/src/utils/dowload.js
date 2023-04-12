const https = require('https');
const fs = require('fs');
const path = require('path');



function fileDownload(url, dest) {
    
    if (!dest) {
        console.error('Data source is required');
        return;
      }

    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);
      https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (error) => {
        file.close();
        fs.unlink(dest, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
          reject(error);
        });
      });
    });
  }
  

  module.exports = {fileDownload}