

function getCurrentOTPdateTimeFormat() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0'); // add leading zero if needed
    const time = `${formattedHours}:${formattedMinutes}${amOrPm}`;
    const date = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    return { time, date };
  }

  function convertTimestampToIsoString(timestamp) {
    const date = new Date(timestamp);
    const isoString = date.toISOString();
    return isoString;
  }

  function getDurationString(durationInSeconds) {
    const durationInMinutes = Math.floor(durationInSeconds / 60);
    const durationInHours = Math.floor(durationInMinutes / 60);
    const remainingMinutes = durationInMinutes % 60;
    let durationString = '';
    if (durationInHours > 0) {
      durationString = `${durationInHours}h, `;
    }
    durationString += `${remainingMinutes}m`;
    return durationString;
  }
  
  module.exports = { getCurrentOTPdateTimeFormat, convertTimestampToIsoString, getDurationString }

