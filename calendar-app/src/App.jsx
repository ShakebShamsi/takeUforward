import Calendar from "./components/Calendar";

export default function App() {
   return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">

         {/* MAIN CONTENT */}
         <div className="flex-1 flex items-center justify-center p-2">
            <Calendar />
         </div>

         {/* FOOTER */}
         <footer className="text-center text-xs text-gray-500 py-2 border-t bg-white/60 backdrop-blur-sm">
            <span className="font-medium">Interactive Calendar</span> • Built by Shakeb
         </footer>

      </div>
   );
}
