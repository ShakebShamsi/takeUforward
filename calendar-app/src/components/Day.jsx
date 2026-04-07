// components/Day.jsx
import { format, isToday } from "date-fns";
import clsx from "clsx";

export default function Day({ day, onClick, isStart, isEnd, isInRange }) {
   return (
      <div
         onClick={() => onClick(day)}
         className={clsx(
            "p-2 text-center cursor-pointer rounded-lg transition-all duration-200",
            "hover:bg-blue-100",
            isStart && "bg-blue-500 text-white",
            isEnd && "bg-blue-500 text-white",
            isInRange && "bg-blue-200",
            isToday(day) && "border border-red-500"
         )}
      >
         {format(day, "d")}
      </div>
   );
}
