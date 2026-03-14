export const formatDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return dateStr;
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return dateStr;
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string') return timeStr;
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return timeStr;
  const hour = String(Number(match[1]));
  const minutes = match[2];
  const meridiem = match[3].toUpperCase();
  return `${hour}:${minutes} ${meridiem}`;
};
