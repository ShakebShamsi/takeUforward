import { format, isToday, isSameMonth } from "date-fns";
import clsx from "clsx";

export default function Day({
   day,
   currentDate,
   index,
   onClick,
   isStart,
   isEnd,
   isInRange,
}) {
   const isCurrentMonth = isSameMonth(day, currentDate);

   const isSaturday = index % 7 === 5;
   const isSunday = index % 7 === 6;

   return (
      <div
         onClick={() => onClick(day)}
         className={clsx(
            "h-10 flex items-center justify-center rounded-xl cursor-pointer text-sm",
            "transition-all duration-200 hover:scale-105",

            // 🔹 OUT OF MONTH (highest priority)
            !isCurrentMonth && "text-gray-300",

            // 🔹 WEEKEND (only if current month)
            isCurrentMonth && isSaturday && "text-blue-500",
            isCurrentMonth && isSunday && "text-red-500",

            // 🔹 Hover
            "hover:bg-blue-100",

            // 🔹 Range styles (override everything)
            isStart && "bg-blue-600 text-white font-bold",
            isEnd && "bg-blue-600 text-white font-bold",
            isInRange && "bg-blue-200",

            // 🔹 Today
            isToday(day) && "border-2 border-red-400"
         )}
      >
         {format(day, "d")}
      </div>
   );
}
