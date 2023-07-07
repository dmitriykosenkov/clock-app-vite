import { useState, useEffect } from "react";

export function useClock() {
   const [currentTime, setCurrentTime] = useState(new Date());
   useEffect(() => {
      const clockId = setInterval(() => {
         setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(clockId);
   }, []);
   return {currentTime}
}
