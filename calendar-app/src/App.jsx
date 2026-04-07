import Calendar from "./components/Calendar";

export default function App() {
   return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">

         {/* MAIN */}
         <div className="flex-1 flex items-center justify-center p-3">
            <Calendar />
         </div>

         {/* FOOTER (unchanged) */}
         <footer className="text-center text-xs text-gray-500 py-2 border-t bg-white/60 backdrop-blur-sm">
            Interactive Calendar • Built by Shakeb
         </footer>

      </div>
   );
}
