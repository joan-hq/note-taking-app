import {
  format,
  isToday,
  isYesterday,
  isThisYear,
  parseISO,
  parse, // ⬅️ Add this
  isValid, // ⬅️ Add this
} from "date-fns";

// Define the "bad" formats you saw in your error logs
const formatStringLong = "dd MMMM yyyy"; // Matches '26 March 2025'
const formatStringShort = "dd MMM yyyy"; // Matches '26 Jun 2025'

export const formatNoteDate = (dateString: string): string => {
  try {
    let date: Date;

    // 1. First, try to parse the *correct* ISO format
    // (This will work for all new notes)
    date = parseISO(dateString);

    // 2. If it's not a valid ISO date, try the '26 March 2025' format
    if (!isValid(date)) {
      date = parse(dateString, formatStringLong, new Date());
    }

    // 3. If it's still not valid, try the '26 Jun 2025' format
    if (!isValid(date)) {
      date = parse(dateString, formatStringShort, new Date());
    }

    // 4. If *nothing* worked, it's truly an invalid date
    if (!isValid(date)) {
      throw new Error("Date string is not in a recognized format");
    }

    // --- Your original, correct logic can now run safely ---
    if (isToday(date)) {
      return format(date, "p"); // e.g., "4:30 PM"
    }
    if (isYesterday(date)) {
      return "Yesterday";
    }
    if (isThisYear(date)) {
      return format(date, "d MMM"); // e.g., "26 Jun"
    }

    return format(date, "d MMM yyyy"); // e.g., "26 Jun 2024"
  } catch (error) {
    console.error(`Could not format date: '${dateString}'`, error);
    return dateString; // Fallback to the original string
  }
};
