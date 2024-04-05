/* Date Format String to use
 * Apr 03, 2024 at 11:07 AM EDT
 */
export const dtf = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
});