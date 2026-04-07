// components/Calendar.jsx
import { useState, useEffect } from "react";
import { format, isSameDay, isAfter, isBefore } from "date-fns";
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

   // LOAD saved notes
   useEffect(() => {
      const saved = localStorage.getItem("notes");
      if (saved) setNotes(saved);
   }, []);

   // SAVE notes
   useEffect(() => {
      localStorage.setItem("notes", notes);
   }, [notes]);

   // Save Selected Range
   useEffect(() => {
      if (startDate && endDate) {
         localStorage.setItem("range", JSON.stringify({ startDate, endDate }));
      }
   }, [startDate, endDate]);

   return (
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

         {/* HERO IMAGE */}
         <div className="h-48 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')] bg-cover bg-center relative">
            <div className="absolute bottom-4 right-4 text-white text-xl font-bold">
               {format(currentDate, "MMMM yyyy")}
            </div>
         </div>

         {/* CONTENT */}
         <div className="p-4 grid md:grid-cols-3 gap-4">

            {/* CALENDAR */}
            <div className="md:col-span-2">
               <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />

               <div className="grid grid-cols-7 gap-2 mt-4">
                  {days.map((day, i) => (
                     <Day
                        key={i}
                        day={day}
                        onClick={handleDayClick}
                        isStart={startDate && isSameDay(day, startDate)}
                        isEnd={endDate && isSameDay(day, endDate)}
                        isInRange={isInRange(day)}
                     />
                  ))}
               </div>
            </div>

            {/* NOTES */}
            <Notes notes={notes} setNotes={setNotes} />
         </div>
      </div>
   );
}
