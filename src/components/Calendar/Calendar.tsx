import { useState, useMemo } from "react";
import { AppointmentsProps } from "../../types";
import { useDataStore, useModals } from "../../store";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data } = useDataStore();
  const { openModal } = useModals();

  const appointmentsByDay = useMemo(() => {
    return data.appointments.reduce((acc, appointment) => {
      const dateStr = new Date(appointment.date).toISOString().split("T")[0];
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(appointment);
      return acc;
    }, {} as { [key: string]: AppointmentsProps[] });
  }, [data.appointments]);

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
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleDateClick = (day: number, isPrevMonth: boolean) => {
    if (isPrevMonth) return;
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(selected);

    openModal("AddAppointmentModal");
  };

  const getDayColor = (day: number, isPrevMonth: boolean) => {
    if (isPrevMonth) return "bg-gray-300 text-gray-500 opacity-50";
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const dateStr = targetDate.toISOString().split("T")[0];
    const appointmentCount = appointmentsByDay[dateStr]?.length || 0;

    if (appointmentCount >= 10) return "bg-red-200";
    if (appointmentCount >= 5) return "bg-yellow-200";
    if (appointmentCount > 0) return "bg-green-200";

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
          const bgColor = getDayColor(day, isPrevMonth);

          const isSelected =
            !isPrevMonth &&
            selectedDate?.getFullYear() === currentDate.getFullYear() &&
            selectedDate?.getMonth() === currentDate.getMonth() &&
            selectedDate?.getDate() === day;

          return (
            <div
              key={index}
              className={`p-2 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary hover:text-white cursor-pointer ${
                isSelected ? "bg-primary text-white" : bgColor
              } ${isPrevMonth ? "cursor-default" : "cursor-pointer"}`}
              onClick={() => handleDateClick(day, isPrevMonth)}
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
        {selectedDate && (
          <span className="text-sm">
            Selecionado: {selectedDate.toLocaleDateString("pt-BR")}
          </span>
        )}
      </div>
    </div>
  );
};
