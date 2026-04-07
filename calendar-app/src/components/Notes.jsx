import { format } from "date-fns";

export default function Notes({ notes, setNotes, selectedDate }) {
   return (
      <div className="flex flex-col h-full">

         <h3 className="font-semibold mb-1 text-gray-700">Notes</h3>

         <p className="text-xs text-gray-500 mb-2">
            {selectedDate
               ? format(selectedDate, "PPP")
               : "Select a date to write notes"}
         </p>

         <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes..."
            className="w-full flex-1 min-h-[120px] p-2 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
         />
      </div>
   );
}
