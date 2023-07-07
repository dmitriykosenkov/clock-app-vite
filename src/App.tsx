import { useState, useEffect } from "react";
import arrowDown from "./assets/desktop/icon-arrow-down.svg";
import arrowUp from "./assets/desktop/icon-arrow-up.svg";
import refresh from "./assets/desktop/icon-refresh.svg";
import s from "./App.module.scss";
import InfoSlide from "./components/InfoSlide/InfoSlide";
import { useClock } from "./hooks/useClock";
import { getData } from "./hooks/helpers";
// https://api.ipbase.com/v2/info?apikey=j5AHVfXqt0c6WhZmcBC5htvZTyGQTMBb3KjLBeGZ&language=en&ip=178.158.195.115

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
   client_ip: string;
}
export interface LocationType {
   location: {
      city: {
         name: string,
      },
      country: {
         name: string,
      },
   },
}

function App() {
   const [theme] = useState(true);
   const [openSlide, setOpenSlide] = useState(false);
   const { currentTime } = useClock();
   const [quote, setQuote] = useState<QuoteType>({ author: "", content: "" });
   const [location, setLocation] = useState<LocationType>({
      location: {
         city: {
            name: "",
         },
         country: {
            name: "",
         },
      },
   });
   const [timezone, setTimezone] = useState<TimezoneType>({
      timezone: "",
      abbreviation: "",
      week_number: 0,
      day_of_week: 0,
      day_of_year: 0,
      client_ip: "",
   });

   useEffect(() => {
      theme
         ? document.body.setAttribute("data-theme", "light")
         : document.body.setAttribute("data-theme", "dark");
   }, [theme]);
   useEffect(() => {
      getData("https://api.quotable.io/random").then((data) => setQuote(data));
      getData("https://worldtimeapi.org/api/timezone/Europe/Kyiv").then(
         (data: TimezoneType) => {
            setTimezone(data);
         }
      );
   }, []);
   useEffect(() => {
      if (timezone.client_ip !== "") {
         // console.log(timezone.client_ip);
         
         // getData(
         //    `https://api.ipbase.com/v2/info?apikey=j5AHVfXqt0c6WhZmcBC5htvZTyGQTMBb3KjLBeGZ&language=en&ip=${timezone.client_ip}`
         // ).then((data) => setLocation(data.data.location));
      }
   }, [timezone]);

   return (
      <div className={s.wrapper}>
         {/* <button onClick={() => setTheme((count) => !count)}>
               {theme ? "LIGHT" : "DARK"}
            </button> */}
         <div className={s.container}>
            {!openSlide && (
               <div className={s.quoteBlock}>
                  <div className={s.quoteContent}>
                     <div className={s.quoteText}>{quote.content}</div>
                     <div className={s.quoteAuthor}>{quote.author}</div>
                  </div>
                  <div className={s.quoteImage}>
                     <img
                        // onClick={() => fetchQuote()}
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
                  <div className={s.timeLocation}>
                     IN {location.location.city.name},{" "}
                     {location.location.country.name}
                  </div>
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
