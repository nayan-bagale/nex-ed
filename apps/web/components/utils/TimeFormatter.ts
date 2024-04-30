export function convert24To12(time24: string): string {
  // Get the hours and minutes from the 24-hour time string.
  const hours = parseInt(time24.substring(0, 2));
  const minutes = time24.substring(2);

  // Convert the hours to 12-hour format.
  let hours12 = hours % 12;
  if (hours12 === 0) {
    hours12 = 12;
  }

  // Add the AM/PM indicator.
  const ampm = hours >= 12 ? "PM" : "AM";

  // Return the 12-hour time string.
  return `${hours12}${minutes} ${ampm}`;
}

// // Example usage:
const time24 = "13:30";
const time12 = convert24To12(time24);

console.log(time12); // "1:30 PM"
