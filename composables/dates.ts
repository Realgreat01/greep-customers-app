import { format, formatISO, isToday, isYesterday } from "date-fns";
import * as timeago from "timeago.js";
import type { Vendor, VendorSchedule } from "~/types/user";

// the local dict example is below.

export const gpDates = {
  formatDate(date: string | Date) {
    return format(new Date(date), "MMM do, yyyy");
  },

  getCreatedAt(date: Date | string) {
    return format(new Date(date), "MMM dd, 'at' h:mm a");
  },

  getTimeAgo(date: string | Date) {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return timeago.format(date);
    }
  },

  formatMonthYear(date: Date | string) {
    return format(new Date(date), "MMM yyyy");
  },

  formatIntlDate(date: Date | string) {
    return format(new Date(date), "dd/MMM/yyyy");
  },

  getTimeDifference(from: number, to: number) {
    if (from < 60 && to < 60) {
      return `${from} - ${to} mins`;
    } else if (from < 60 && to > 60) {
      return `${from}mins - ${Math.round((to / 60) * 2) / 2}hr`;
    }
  },

  getVendorSchedule(schedule: Vendor["schedule"]) {
    if (!schedule) return "Closed";
    else {
      const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const currentDay = new Date()
        .toLocaleString("en-US", {
          timeZone: schedule?.timezone,
          weekday: "short",
        })
        .toLowerCase();
      const todaySchedule = schedule.schedule[currentDay];

      if (!todaySchedule) {
        return "Closed";
      }

      const { from, to } = todaySchedule;
      const formatTime = ({ hr, min }) => {
        const period = hr >= 12 ? "pm" : "am";
        const formattedHr = hr % 12 || 12; // Convert 0 or 24 to 12 for 12-hour format
        return `${formattedHr}${period}`;
      };

      return `${formatTime(from)} - ${formatTime(to)}`;
    }
  },

  // Example usage
};
