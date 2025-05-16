'use client';

import { useState } from 'react';

export default function CalendarManual({ onDaySelect }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    onDaySelect(day);
    document.getElementById('ticket-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-xs mx-auto">
      <div className="grid grid-cols-7 gap-1 my-6">
        {[...Array(30)].map((_, index) => {
          const day = index + 1;
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`w-10 h-10 rounded-full ${
                isSelected ? 'bg-black text-white' : 'bg-white text-black border border-black hover:bg-gray-300'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}