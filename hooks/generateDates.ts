const generateDates = (numDays = 14) => {
  const today = new Date();
  const dates = [];
  const halfDays = Math.floor(numDays / 2);

  // Generate dates from -halfDays to +halfDays centered around today
  for (let i = -halfDays; i <= halfDays; i++) {
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + i);
    dates.push(newDate);
  }

  return dates;
};

export { generateDates };
