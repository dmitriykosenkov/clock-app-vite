import { useState, useEffect } from "react";
import arrowDown from "./assets/desktop/icon-arrow-down.svg";
import arrowUp from "./assets/desktop/icon-arrow-up.svg";
import refresh from "./assets/desktop/icon-refresh.svg";
import s from "./App.module.scss";
import InfoSlide from "./components/InfoSlide/InfoSlide";

interface QuoteType {
   content: string;
   author: string;
}
export interface TimezoneType {
   timezone: string;
   abbreviation: string;
   week_number: number;
   day_of_week: number;
   day_of_year: number;
}

function App() {
   const [theme] = useState(true);
   const [openSlide, setOpenSlide] = useState(false);
   const [quote, setQuote] = useState<QuoteType>({ author: "", content: "" });
   const [currentTime, setCurrentTime] = useState(new Date());
   const [timezone, setTimezone] = useState<TimezoneType>({
      timezone: "",
      abbreviation: "",
      week_number: 0,
      day_of_week: 0,
      day_of_year: 0,
   });
   const fetchQuote = async () => {
      try {
         const response = await fetch("https://api.quotable.io/random");
         const { statusCode, statusMessage, ...data } = await response.json();
         if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
         setQuote(data);
      } catch (error) {
         console.error(error);
      }
   };
   const fetchTime = async () => {
      console.log(timezone);
      try {
         const response = await fetch(
            "http://worldtimeapi.org/api/timezone/Europe/Kyiv"
         );
         return await response.json();
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      theme
         ? document.body.setAttribute("data-theme", "light")
         : document.body.setAttribute("data-theme", "dark");
   }, [theme]);
   useEffect(() => {
      fetchQuote();
      fetchTime().then((data) => setTimezone(data));
   }, []);
   useEffect(() => {
      const clockId = setInterval(() => {
         setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(clockId);
   }, []);

   return (
      <div className={s.wrapper}>
         {/* <button onClick={() => setTheme((count) => !count)}>
               {theme ? "LIGHT" : "DARK"}
            </button> */}
         <div className={s.container}>
            {!openSlide && (
               <div className={s.quoteBlock}>
                  <div className={s.quoteContent}>
                     <div className={s.quoteText}>
                        {quote.content}
                        {/* “The science of operations, as derived from mathematics
                        more especially, is a science of itself, and has its own
                        abstract truth and value.” */}
                     </div>
                     <div className={s.quoteAuthor}>{quote.author}</div>
                  </div>
                  <div className={s.quoteImage}>
                     <img
                        onClick={() => fetchQuote()}
                        src={refresh}
                        alt="refresh"
                     />
                  </div>
               </div>
            )}
            <div className={s.mainBlock}>
               <div className={s.time}>
                  <div className={s.timeSubtitle}>
                     GOOD EVENING, <span>IT’S CURRENTLY</span>
                  </div>
                  <div className={s.timeTitle}>
                     {currentTime
                        .toLocaleTimeString()
                        .replace(/(.*)\D\d+/, "$1")}
                     <span>{timezone.abbreviation}</span>
                  </div>
                  <div className={s.timeLocation}>IN LONDON, UK</div>
               </div>
               <div
                  className={s.btn}
                  onClick={() => setOpenSlide((prev) => !prev)}
               >
                  <div className={s.buttonMore}>
                     {!openSlide ? "more" : "less"}
                  </div>
                  <span className={s.btnArrow}>
                     {!openSlide ? (
                        <img src={arrowUp} alt="" />
                     ) : (
                        <img src={arrowDown} alt="" />
                     )}
                  </span>
               </div>
            </div>
         </div>
         {openSlide && <InfoSlide timezone={timezone} />}
      </div>
   );
}

export default App;
