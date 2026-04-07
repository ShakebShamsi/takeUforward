import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";

export const generateCalendar = (currentDate) => {
  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);

  const startDate = startOfWeek(startMonth, { weekStartsOn: 1 }); // ✅ Monday
  const endDate = endOfWeek(endMonth, { weekStartsOn: 1 });

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
};
