const fs = require('fs');
const path = require('path');

const download = require('../utils/dowload')

async function downloadFiles() {
  const gtfsUrl = process.env.GTFS_SOURCE;
  const gtfsDest = path.join(__dirname, '../services/OTP/data', 'gtfs.zip');
  const osmUrl = process.env.OSM_DATA_SOURCE;
  const osmDest = path.join(__dirname, '../services/OTP/data', 'slovakia-latest.osm.pbf');
  const otpUrl = 'https://repo1.maven.org/maven2/org/opentripplanner/otp/2.2.0/otp-2.2.0-shaded.jar'
  const otpDest = path.join(__dirname,'../services/OTP', 'otp-2.2.0-shaded.jar');


  try {
    await download.fileDownload(gtfsUrl, gtfsDest);
    console.log(`Downloaded GTFS data to ${gtfsDest}`);
    await download.fileDownload(osmUrl, osmDest);
    console.log(`Downloaded OSM data to ${osmDest}`);
    await download.fileDownload(otpUrl,otpDest);
    console.log(`Downloaded OTP to ${otpDest}`)
  } catch (error) {
    console.error('Error downloading files:', error);
  }
}

module.exports = { downloadFiles }