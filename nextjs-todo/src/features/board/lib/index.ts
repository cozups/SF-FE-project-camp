export const calculateTimeOffset = (date: Date) => {
  const offsetInMinutes = date.getTimezoneOffset();
  const calculatedTime = new Date(date.getTime() - offsetInMinutes * 60 * 1000);

  return calculatedTime;
};
