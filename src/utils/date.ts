import { 
  format, 
  isToday, 
  isYesterday,
  differenceInDays, 
  parseISO, 
  isValid 
} from "date-fns";

// format date
export const formatDate = (
  date: string | Date,
  pattern: string = "dd mm yyy"
) : string => {
  //pass date or modify date to variable d
  const d  = typeof date === "string" ? parseISO(date) : date
  return isValid(d) ? format(d, pattern) : "Invalid Date"
}


// formatRelativeTIme(date)
export const formatRelativeTIme = (dateString: string) : string => {
  const date = parseISO(dateString);

  if(!isValid(dateString)) return dateString;

  if(isToday(dateString)) return "Today";

  if(isYesterday(dateString)) return "Yesterday";

  return format(date, "dd mm");
}


// count how many date after created
export const countDaysToToday = (dateString: string) : number=> {
  const date = parseISO(dateString);
  if(!isValid(date)) return 0;
  return Math.abs(differenceInDays(new Date(), date));
}


// isSameDate: Y->show time; N->show date
export const isSameDateToday = (dateString: string) : string => {
  const date = parseISO(dateString);
  if(!isValid(date)) return dateString;

  if(isToday(date)){
    return format (date, "p");
  }

  return format(date, "d MM");
}

