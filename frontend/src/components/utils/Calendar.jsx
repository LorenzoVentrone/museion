'use client';

import { useState, useMemo } from 'react';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


export default function TicketCalendar({ onDaySelect, selectedDate }) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed

  const formatDate = (date) => {
    // Restituisce YYYY-MM-DD in locale, senza problemi di timezone
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDayClick = (cell) => {
    if (cell.isOtherMonth) return;
    onDaySelect(cell.dateStr);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const calendarCells = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    // Adatta per settimana che parte da lunedì
    const startDay = firstDay === 0 ? 7 : firstDay;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  
    const cells = [];
  
    // Giorni del mese precedente
    for (let i = 1; i < startDay; i++) {
      const day = daysInPrevMonth - (startDay - 1) + i;
      const date = new Date(prevYear, prevMonth, day);
      cells.push({ day, dateStr: formatDate(date), isOtherMonth: true });
    }
  
    // Giorni del mese corrente
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      cells.push({ day, dateStr: formatDate(date), isOtherMonth: false });
    }
  
    // Giorni del mese successivo
    const totalCells = Math.ceil(cells.length / 7) * 7;
    for (let i = 1; cells.length < totalCells; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      cells.push({ day: i, dateStr: formatDate(date), isOtherMonth: true });
    }
  
    return cells;
  }, [currentYear, currentMonth]);



  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header mese/anno con frecce */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-500 hover:text-black text-xl cursor-pointer">&lt;</button>
        <h2 className="text-center text-xl font-semibold text-gray-800">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={handleNextMonth} className="text-gray-500 hover:text-black text-xl cursor-pointer">&gt;</button>
      </div>

      {/* Giorni della settimana */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-center text-gray-500 select-none">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Giorni */}
      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map((cell, idx) => {
          const isSelected = selectedDate === cell.dateStr && !cell.isOtherMonth;
          return (
            <button
              key={idx}
              onClick={() => handleDayClick(cell)}
              disabled={cell.isOtherMonth}
              className={`
                p-2 rounded-md text-sm text-center
                ${cell.isOtherMonth
                  ? 'text-gray-300 cursor-default'
                  : isSelected
                  ? 'bg-orange-400 text-white shadow-md'
                  : 'hover:bg-orange-200 text-gray-700 cursor-pointer'}
              `}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
