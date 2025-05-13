// src/app/components/TicketForm.jsx
'use client';
import React, { useState } from 'react';
import Calendar from './Calendar';
import axios from 'axios';

export default function TicketForm() {
  const [date, setDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!date || quantity < 1) {
      setMessage('Inserisci una data valida e una quantità maggiore di 0.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/orders', {
        user_id: 1, // Sostituisci con user loggato se gestisci auth
        ticket_id: await fetchTicketId(date), // Ottieni il ticket_id per la data scelta
        quantity: quantity
      });
      setMessage(`Ordine creato! ID: ${res.data.order_id}`);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Errore durante l\'acquisto.');
    }
  };

  const fetchTicketId = async (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const res = await axios.get(`http://localhost:3001/tickets/date/${formattedDate}`);
    return res.data.ticket_id;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-grey-600 p-6 rounded shadow max-w-md mx-auto">
      <Calendar selectedDate={date} onDateChange={setDate} />
      <div className="mb-4">
        <label className="block mb-2">Quantità</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700">
        Acquista
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
}
