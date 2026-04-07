import { useState, useEffect } from "react";
import clsx from "clsx";
import {
   format,
   isSameDay,
   isAfter,
   isBefore,
} from "date-fns";
import { generateCalendar } from "../utils/calendar";
import Day from "./Day";
import Header from "./Header";
import Notes from "./Notes";

export default function Calendar() {
   const [currentDate, setCurrentDate] = useState(new Date());
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [notes, setNotes] = useState("");

   const days = generateCalendar(currentDate);

   // localStorage (premium touch)
   useEffect(() => {
      const saved = localStorage.getItem("notes");
      if (saved) setNotes(saved);
   }, []);

   useEffect(() => {
      localStorage.setItem("notes", notes);
   }, [notes]);

   const handleDayClick = (day) => {
      if (!startDate || (startDate && endDate)) {
         setStartDate(day);
         setEndDate(null);
      } else {
         if (isBefore(day, startDate)) {
            setEndDate(startDate);
            setStartDate(day);
         } else {
            setEndDate(day);
         }
      }
   };

   const isInRange = (day) =>
      startDate &&
      endDate &&
      isAfter(day, startDate) &&
      isBefore(day, endDate);

   return (
      <div className="w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden">

         {/* HERO IMAGE SECTION */}
         <div className="relative h-44 md:h-52 bg-white border-b">

            {/* Spiral Binding Effect */}
            <div className="absolute top-0 left-0 right-0 flex justify-center gap-2 py-2">
               {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-400 rounded-full"></div>
               ))}
            </div>

            {/* Image */}
            <img
               src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
               className="w-full h-full object-cover"
            />

            {/* Overlay text */}
            <div className="absolute bottom-4 right-6 text-white text-right">
               <h1 className="text-3xl font-bold">
                  {format(currentDate, "MMMM")}
               </h1>
               <p>{format(currentDate, "yyyy")}</p>
            </div>
         </div>

         {/* MAIN CONTENT */}
         <div className="grid md:grid-cols-3 gap-4 p-4">

            {/* CALENDAR */}
            <div className="md:col-span-2">
               <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />

               {/* Week Days */}
               <div className="grid grid-cols-7 text-center text-sm font-semibold mt-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                     <div
                        key={d}
                        className={clsx(
                           i === 5 && "text-blue-500", // Saturday
                           i === 6 && "text-red-500",  // Sunday
                           i < 5 && "text-gray-500"
                        )}
                     >
                        {d}
                     </div>
                  ))}
               </div>

               {/* Days */}
               <div className="grid grid-cols-7 gap-2 mt-2">
                  {days.map((day, i) => (
                     <Day
                        key={i}
                        index={i}   // ✅ ADD THIS
                        day={day}
                        currentDate={currentDate}
                        onClick={handleDayClick}
                        isStart={startDate && isSameDay(day, startDate)}
                        isEnd={endDate && isSameDay(day, endDate)}
                        isInRange={isInRange(day)}
                     />
                  ))}
               </div>
            </div>

            {/* NOTES PANEL */}
            <div className="bg-gray-50 rounded-2xl p-4 shadow-inner">
               <Notes notes={notes} setNotes={setNotes} />
            </div>

         </div>
      </div>
   );
}
