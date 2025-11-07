import {
  format,
  isToday,
  isYesterday,
  isThisYear,
  parseISO,
  parse,
  isValid,
} from "date-fns";

const formatStringLong = "dd MMMM yyyy";
const formatStringShort = "dd MMM yyyy";

export const formatNoteDate = (dateString: string): string => {
  try {
    let date: Date;

    date = parseISO(dateString);

    if (!isValid(date)) {
      date = parse(dateString, formatStringLong, new Date());
    }

    if (!isValid(date)) {
      date = parse(dateString, formatStringShort, new Date());
    }

    if (!isValid(date)) {
      throw new Error("Date string is not in a recognized format");
    }

    if (isToday(date)) {
      return format(date, "p");
    }
    if (isYesterday(date)) {
      return "Yesterday";
    }
    if (isThisYear(date)) {
      return format(date, "d MMM");
    }

    return format(date, "d MMM yyyy");
  } catch (error) {
    console.error(`Could not format date: '${dateString}'`, error);
    return dateString;
  }
};
