// src/app/components/Calendar.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Calendar({ selectedDate, onDateChange }) {
  return (
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2">Scegli una data</label>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        minDate={new Date()}
        className="border border-gray-300 px-4 py-2 rounded w-full"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
}
