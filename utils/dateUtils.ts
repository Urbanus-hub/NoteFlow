/**
 * Format a date to show the day abbreviation (e.g., "Mon", "Tue")
 */
const formatDay = (date: Date): string =>
  date.toLocaleDateString("en-US", { weekday: "short" });

/**
 * Format a date to show the date number (e.g., 1-31)
 */
const formatNumber = (date: Date): number => date.getDate();

/**
 * Format a date to show full format (e.g., "Monday, February 23")
 */
export const formatFullDate = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

/**
 * Get greeting based on time of day
 */
export const getGreeting = (date: Date): string => {
  const hours = date.getHours();

  if (hours < 12) {
    return "Good Morning";
  } else if (hours < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export { formatDay, formatNumber };
