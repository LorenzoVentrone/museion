'use client';

import { useState } from 'react';

const daysOfWeek = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sut', 'Sun'];

export default function TicketCalendar({ onDaySelect, selectedDate }) {
  // Mese e anno fissi (puoi rendere dinamici se vuoi)
  const year = 2025;
  const month = 6; // Giugno

  // Calcola giorno della settimana del 1° giorno del mese (1 = Lun, 7 = Dom)
  // JS Date.getDay() = 0 (Dom) - 6 (Sab), quindi lo mappiamo
  const firstDay = new Date(year, month - 1, 1).getDay();
  // Mappiamo: JS domenica(0) => 7 per calendario lun-dom
  const startDay = firstDay === 0 ? 7 : firstDay;

  // Numero di giorni nel mese (Giugno = 30)
  const daysInMonth = 30;

  // Array per le celle del calendario: prima i vuoti per allineare il primo giorno, poi i giorni
  const calendarCells = [];
  for (let i = 1; i < startDay; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Funzione chiamata al click
  const handleDayClick = (day) => {
    if (!day) return;
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    onDaySelect(dateStr);
  };

  return (
    <div className="max-w-md mx-auto p-4 ">
      {/* Intestazione mese */}
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
        Giugno 2025
      </h2>

      {/* Intestazioni giorni settimana */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-sm font-medium text-gray-500 select-none">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Griglia giorni */}
      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map((day, idx) => {
          const dateStr = day
            ? `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
            : null;
          const isSelected = selectedDate === dateStr;
          if (!day) {
            // Giorni vuoti: invisibili ma con altezza fissa e nessun bordo/colori
            return (
              <div
                key={idx}
                className="h-12" // stessa altezza dei giorni veri
                style={{ pointerEvents: 'none', backgroundColor: 'transparent' }}
              />
            );
          }
          return (
            <button
              key={idx}
              onClick={() => handleDayClick(day)}
              className={`p-3 rounded-lg text-center text-gray-700 font-semibold
                ${isSelected ? 'bg-orange-400 text-white shadow-lg' : 'hover:bg-orange-200'}
                cursor-pointer
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
