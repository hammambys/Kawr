import { differenceInCalendarDays, format } from "date-fns";

export default function BookingDates({ booking, className }) {
  return (
    <div className={"flex gap-1 " + className}>
      <div>
        {"datetime" in booking.game &&
          "Date: " + format(new Date(booking.game?.datetime), "dd/mm/yyyy")}
      </div>
      <div>
        {"datetime" in booking.game &&
          "Time: " + format(new Date(booking.game?.datetime), "HH:mm")}
      </div>
    </div>
  );
}
