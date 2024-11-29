import { format, formatISO } from "date-fns";

export const phDates = {
  formatDate(date: string | Date) {
    return format(new Date(date), "MMM do, yyyy");
  },

  getCreatedAt(date: Date | string) {
    return format(new Date(date), "MMM dd, 'at' h:mm a");
  },

  formatMonthYear(date: Date | string) {
    return format(new Date(date), "MMM yyyy");
  },

  formatIntlDate(date: Date | string) {
    return format(new Date(date), "dd/MMM/yyyy");
  },
};
