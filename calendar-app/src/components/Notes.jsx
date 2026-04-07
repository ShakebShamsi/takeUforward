// components/Notes.jsx
export default function Notes({ notes, setNotes }) {
   return (
      <div className="border rounded-xl p-3">
         <h3 className="font-semibold mb-2">Notes</h3>
         <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-40 border rounded p-2"
            placeholder="Write notes..."
         />
      </div>
   );
}
