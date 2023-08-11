export const getSleepHours = (input: string) => {
  // Split the input into start and end times
  const [startTime, endTime] = input.split("-");

  // Convert times to 24-hour format
  const convertTo24Hour = (time: string) => {
    const [hours, minutes] = time.slice(0, -2).split(":").map(Number);
    const period = time.slice(-2).toLowerCase();

    let adjustedHours = hours;
    if (period === "pm" && hours !== 12) {
      adjustedHours += 12;
    } else if (period === "am" && hours === 12) {
      adjustedHours = 0;
    }

    return {
      hours: adjustedHours,
      minutes: minutes,
    };
  };

  const start = convertTo24Hour(startTime);
  const end = convertTo24Hour(endTime);

  // Calculate the difference in hours and minutes
  let hoursDiff = end.hours - start.hours;
  let minutesDiff = end.minutes - start.minutes;

  if (minutesDiff < 0) {
    minutesDiff += 60;
    hoursDiff -= 1;
  }

  // If the end time is on the next day (e.g., sleeping past midnight)
  if (hoursDiff < 0) {
    hoursDiff += 24;
  }

  return `${hoursDiff} hours ${minutesDiff} minutes`;
};
