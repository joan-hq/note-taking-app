import { format, isToday, isYesterday, isThisYear, parseISO } from "date-fns";

export const formatNoteDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);

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
    console.error("Could not format date:", dateString, error);

    return dateString;
  }
};
