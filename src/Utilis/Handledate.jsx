const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const gujaratiDays = ["રવિવાર", "સોમવાર", "મંગળવાર", "બુધવાર", "ગુરુવાર", "શુક્રવાર", "શનિવાર"];

export const getGujaratiDayName = (inputDate = new Date()) => {
  const date = new Date(inputDate);
  const dayIndex = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  return gujaratiDays[dayIndex];
};

export const handledate = (time) => {
  const date = new Date(time);
  const year = date.getUTCFullYear();
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${day} ${month} ${year}`;
};

export const handleDateWithTime = (time) => {
  const date = new Date(time);
  const year = date.getUTCFullYear();
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate().toString().padStart(2, '0');

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return `${day} ${month} ${year} & ${formattedTime}`;
};

export const timeAgo = (inputDate) => {
  const date = new Date(inputDate);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000); // years
  if (interval >= 1) return interval === 1 ? "1 year ago" : `${interval} years ago`;

  interval = Math.floor(seconds / 2592000); // months
  if (interval >= 1) return interval === 1 ? "1 month ago" : `${interval} months ago`;

  interval = Math.floor(seconds / 86400); // days
  if (interval >= 1) {
    if (interval === 1) return "yesterday";
    return `${interval} days ago`;
  }

  interval = Math.floor(seconds / 3600); // hours
  if (interval >= 1) return interval === 1 ? "1 hour ago" : `${interval} hours ago`;

  interval = Math.floor(seconds / 60); // minutes
  if (interval >= 1) return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;

  if (seconds < 10) return "just now";
  return `${seconds} seconds ago`;
};