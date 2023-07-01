import { useRef, FC } from "react";
import { CSSTransition } from "react-transition-group";
import s from "./InfoSlide.module.scss";
import { TimezoneType } from "../../App";

const duration = 300;

interface PropsType {
   timezone: TimezoneType;
}

const InfoSlide: FC<PropsType> = ({ timezone }) => {
   return (
      <div className={s.slide}>
         <div className={s.container}>
            <div className={s.inner}>
               <div className={s.slideItem}>
                  <div className={s.slideItemSubtitle}>CURRENT TIMEZONE</div>
                  <div className={s.slideItemTitle}>{timezone.timezone}</div>
               </div>
               <div className={s.slideItem}>
                  <div className={s.slideItemSubtitle}>Day of the year</div>
                  <div className={s.slideItemTitle}>{timezone.day_of_year}</div>
               </div>
               <div className={s.slideItem}>
                  <div className={s.slideItemSubtitle}>Day of the week</div>
                  <div className={s.slideItemTitle}>{timezone.day_of_week}</div>
               </div>
               <div className={s.slideItem}>
                  <div className={s.slideItemSubtitle}>Week number</div>
                  <div className={s.slideItemTitle}>{timezone.week_number}</div>
               </div>
            </div>
         </div>
      </div>
   );
};
export default InfoSlide;
