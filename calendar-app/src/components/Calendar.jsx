import { useState, useEffect } from "react";
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

   // ✅ Notes + selected date
   const [notesMap, setNotesMap] = useState({});
   const [selectedDate, setSelectedDate] = useState(null);

   const days = generateCalendar(currentDate);

   // ✅ LOAD ALL DATA (runs once)
   useEffect(() => {
      try {
         const savedNotes = localStorage.getItem("notesMap");
         const savedDate = localStorage.getItem("selectedDate");
         const savedMonth = localStorage.getItem("currentMonth");

         if (savedNotes) setNotesMap(JSON.parse(savedNotes));
         if (savedDate) setSelectedDate(new Date(savedDate));
         if (savedMonth) setCurrentDate(new Date(savedMonth));
      } catch (err) {
         console.error("Error loading localStorage:", err);
      }
   }, []);

   // ✅ SAVE notesMap (ONLY when updated)
   useEffect(() => {
      if (Object.keys(notesMap).length > 0) {
         localStorage.setItem("notesMap", JSON.stringify(notesMap));
      }
   }, [notesMap]);

   // ✅ SAVE selected date
   useEffect(() => {
      if (selectedDate) {
         localStorage.setItem("selectedDate", selectedDate.toISOString());
      }
   }, [selectedDate]);

   // ✅ SAVE current month
   useEffect(() => {
      if (currentDate) {
         localStorage.setItem("currentMonth", currentDate.toISOString());
      }
   }, [currentDate]);

   const handleDayClick = (day) => {
      setSelectedDate(day);

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

   // ✅ Current note
   const selectedKey = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;

   const currentNote = selectedKey ? notesMap[selectedKey] || "" : "";

   const handleNoteChange = (value) => {
      if (!selectedKey) return;

      setNotesMap((prev) => ({
         ...prev,
         [selectedKey]: value,
      }));
   };

   return (
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

         {/* HERO */}
         <div className="relative h-44 md:h-52 border-b">
            <img
               src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
               className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-6 text-white text-right">
               <h1 className="text-2xl md:text-3xl font-bold">
                  {format(currentDate, "MMMM")}
               </h1>
               <p>{format(currentDate, "yyyy")}</p>
            </div>
         </div>

         {/* CONTENT */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

            {/* CALENDAR */}
            <div className="md:col-span-2">
               <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />

               {/* WEEK HEADER */}
               <div className="grid grid-cols-7 text-center text-sm font-semibold mt-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                     <div
                        key={d}
                        className={
                           i === 5
                              ? "text-blue-500"
                              : i === 6
                                 ? "text-red-500"
                                 : "text-gray-500"
                        }
                     >
                        {d}
                     </div>
                  ))}
               </div>

               {/* DAYS */}
               <div className="grid grid-cols-7 gap-2 mt-2">
                  {days.map((day, i) => (
                     <Day
                        key={i}
                        index={i}
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

            {/* NOTES */}
            <div className="bg-gray-50 rounded-2xl p-3 shadow-inner">
               <Notes
                  notes={currentNote}
                  setNotes={handleNoteChange}
                  selectedDate={selectedDate}
               />
            </div>

         </div>
      </div>
   );
}
