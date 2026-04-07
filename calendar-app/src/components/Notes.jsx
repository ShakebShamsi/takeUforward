export default function Notes({ notes, setNotes }) {
   return (
      <div className="flex flex-col h-full">

         {/* Header */}
         <h3 className="font-semibold mb-2 text-gray-700">
            Notes
         </h3>

         {/* Textarea */}
         <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes..."
            className="
          w-full flex-1
          p-3 rounded-xl border
          text-sm
          resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-400
        "
         />
      </div>
   );
}
