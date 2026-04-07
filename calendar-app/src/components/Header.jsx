import { addMonths, subMonths, format } from "date-fns";

export default function Header({ currentDate, setCurrentDate }) {
   return (
      <div className="flex justify-between items-center mb-4">

         <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="flex items-center justify-center w-10 h-10 rounded-full
        bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
         >
            ◀
         </button>

         <h2 className="font-semibold text-xl tracking-wide text-gray-700">
            {format(currentDate, "MMMM yyyy")}
         </h2>

         <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="flex items-center justify-center w-10 h-10 rounded-full
        bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
         >
            ▶
         </button>

      </div>
   );
}
