'use client';

import { useState } from 'react';
import CalendarManual from '@/components/utils/Calendar';

export default function TicketsPurchasePage() {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Intestazione con titolo */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl text-black font-bold">Acquista i tuoi biglietti</h1>
        <p className="text-gray-600 mt-2">Seleziona un giorno per visualizzare i biglietti disponibili</p>
      </header>

      {/* Calendario manuale */}
      <section>
        <CalendarManual onDaySelect={handleDaySelect} />
      </section>

      {/* Sezione dei biglietti che appare dopo selezione */}
      {selectedDay && (
        <section id="ticket-section" className="mt-10">
          <h2 className="text-2xl text-black font-semibold text-center mb-4">
            Biglietti disponibili per il giorno {selectedDay}
          </h2>

          {/* Qui inseriremo la logica per elencare i biglietti */}
          <div className="text-center text-gray-500">[TODO] Elenco biglietti acquistabili</div>
        </section>
      )}
    </main>
  );
}
