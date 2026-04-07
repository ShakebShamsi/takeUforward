// components/Header.jsx
import { addMonths, subMonths, format } from "date-fns";

export default function Header({ currentDate, setCurrentDate }) {
   return (
      <div className="flex justify-between items-center">
         <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            ◀
         </button>

         <h2 className="font-bold text-lg">
            {format(currentDate, "MMMM yyyy")}
         </h2>

         <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            ▶
         </button>
      </div>
   );
}
