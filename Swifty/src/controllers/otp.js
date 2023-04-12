

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const transitData = require('../data-providers/transit-data')

function runOTP() {
    const otpJarPath = path.join(__dirname, '../services/OTP', 'otp-2.2.0-shaded.jar');
    const otpDataDir = path.join(__dirname, '../services/OTP/data');
  
    return new Promise((resolve, reject) => {
      transitData.downloadFiles().then(() => {
        const args = [
          '-Xmx2G',
          '-jar',
          otpJarPath,
          '--build',
          '--serve',
          otpDataDir
        ];
        
        const process = spawn('java', args);
        
        process.stdout.on('data', (data) => {
          console.log(`OTP stdout: ${data}`);
          if (data.includes('Grizzly server running')) {
            resolve();
          }
        });
        
        process.stderr.on('data', (data) => {
          console.error(`OTP stderr: ${data}`);
          reject();
        });
        
        process.on('close', (code) => {
          console.log(`OTP child process exited with code ${code}`);
            reject();
        });
      });
    });
  }
  
  

module.exports = {
  runOTP
};
