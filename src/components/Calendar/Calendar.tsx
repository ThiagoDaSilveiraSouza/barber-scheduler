import { useState, useMemo } from "react";
import { AppointmentsProps } from "../../types";
import { useFormsData } from "../../store/useFormsData";
import { transformDateToString } from "../../utils";

type CalendarProps = {
  appointments?: AppointmentsProps[];
  dayHandlerClick?: (day: number, isPrevMonth: boolean) => void;
  selectedDay?: Date;
};

export const Calendar = ({
  appointments = [],
  dayHandlerClick = () => {},
  selectedDay = new Date(),
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { formsData, setFormsData } = useFormsData();

  const appointmentsByDay = useMemo(() => {
    return appointments.reduce((acc, currentAppointment) => {
      acc[currentAppointment.date] = acc[currentAppointment.date] || [];
      acc[currentAppointment.date].push(currentAppointment);
      return acc;
    }, {} as { [key: string]: AppointmentsProps[] });
  }, [appointments]);

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const getMonthName = (date: Date) => monthNames[date.getMonth()];

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const lastDayPrevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  const daysInMonth = useMemo(() => {
    const prevMonthDays = Array.from(
      { length: firstDayOfMonth.getDay() },
      (_, i) => lastDayPrevMonth.getDate() - firstDayOfMonth.getDay() + i + 1
    );
    const currentMonthDays = Array.from(
      { length: lastDayOfMonth.getDate() },
      (_, i) => i + 1
    );
    return [...prevMonthDays, ...currentMonthDays];
  }, [firstDayOfMonth, lastDayOfMonth, lastDayPrevMonth]);

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setFormsData("editedAppointmentForm", { date: undefined });
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setFormsData("editedAppointmentForm", { date: undefined });
  };

  const goToToday = () => {
    setFormsData("editedAppointmentForm", {
      date: new Date().toISOString().split("T")[0],
    });
  };

  const getDayBorder = (day: number, isPrevMonth: boolean) => {
    if (isPrevMonth) return "bg-gray-300 text-gray-500 opacity-50";
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const dateStr = targetDate.toISOString().split("T")[0];
    const appointmentCount = appointmentsByDay[dateStr]?.length || 0;

    if (appointmentCount >= 10) return "border border-red-500";
    if (appointmentCount >= 5) return "border border-yellow-500";
    if (appointmentCount > 0) return "border border-green-500";

    return "";
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-base-200 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button className="btn btn-sm btn-outline" onClick={prevMonth}>
          ❮
        </button>
        <h2 className="text-lg font-semibold">
          {getMonthName(currentDate)} {currentDate.getFullYear()}
        </h2>
        <button className="btn btn-sm btn-outline" onClick={nextMonth}>
          ❯
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-bold">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day, index) => {
          const isPrevMonth = index < firstDayOfMonth.getDay();
          const dayBorder = getDayBorder(day, isPrevMonth);
          const selectedDateString = transformDateToString(selectedDay);
          const currentDateString = transformDateToString(currentDate);

          console.log("dayBorder", dayBorder);
          const isSelected = selectedDateString === currentDateString;

          return (
            <div
              key={index}
              className={`p-2 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary hover:text-white cursor-pointer border-s-black ${
                isSelected ?? "bg-primary text-white"
              } ${isPrevMonth ? "cursor-default" : "cursor-pointer"}`}
              onClick={() => dayHandlerClick(day, isPrevMonth)}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button className="btn btn-sm btn-primary" onClick={goToToday}>
          Hoje
        </button>
        {formsData.editedAppointmentForm?.date && (
          <span className="text-sm">
            Selecionado: {formsData.editedAppointmentForm?.date}
          </span>
        )}
      </div>
    </div>
  );
};
