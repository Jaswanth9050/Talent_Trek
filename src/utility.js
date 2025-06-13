// src/utility.js
export function getTimeAgo(timestamp) {
  if (!timestamp) return 'Unknown date';

  const posted = new Date(timestamp); // Convert the string to a Date object
  if (isNaN(posted.getTime())) return 'Invalid date'; // If not a valid date

  const now = new Date();
  const seconds = Math.floor((now - posted) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} weeks ago`;
}
