'use client';

import { useState, useEffect } from 'react';
import TicketCalendar from '@/components/utils/Calendar';
import TicketList from '@/components/utils/TicketList';
import { cartStore } from '@/components/store/cartStore';
import { useSnapshot } from 'valtio';

function AnimatedTitle({ text }) {
  return (
    <h1 className="text-xl md:text-5xl font-extrabold text-center mb-8 tracking-tight text-[#181818]">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-3 hover:-translate-y-2 cursor-pointer"
          style={{ transitionDelay: `${i * 3}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}

export default function TicketsPurchasePage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const cartSnap = useSnapshot(cartStore);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const handleDaySelect = (date) => {
    setSelectedDay(date);
  };

  useEffect(() => {
    if (!selectedDay) return;

    setLoading(true);
    fetch(`${API_URL}/availability?date=${selectedDay}`)
      .then((res) => res.json())
      .then(setTickets)
      .catch(() => setTickets([]))
      .finally(() => setLoading(false));
  }, [selectedDay]);

  const handleAddToCart = (item) => {
    // Normalizza la data in formato YYYY-MM-DD
    let formattedDate = null;
    if (item.date) {
      const d = new Date(item.date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      formattedDate = `${year}-${month}-${day}`;
    }
    cartStore.addItem({
      ...item,
      quantity: 1,
      date: formattedDate,
      color: item.color ?? null,
      logo: item.logo ?? null,
    });
  };

  useEffect(() => {
    setCartVisible(cartSnap.items.length > 0);
  }, [cartSnap.items.length]);

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <AnimatedTitle text="Book Your Tickets Now" />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Colonna sinistra: solo calendario */}
        <div className="flex-1">
          <TicketCalendar onDaySelect={handleDaySelect} selectedDate={selectedDay} />
        </div>

        {/* Colonna destra: mostra i biglietti DISPONIBILI per il giorno selezionato */}
        <div
          className={`transition-all duration-500 ease-in-out
            ${selectedDay ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}
            flex-shrink-0 w-full md:w-96 p-4 pb-15`}
          style={{ willChange: 'opacity, transform' }}
        >
          <h2 className="text-3xl font-bold mb-4 justify-center text-center">Tickets Available</h2>
          {loading && <p>Loading...</p>}
          {!loading && selectedDay && (
            <TicketList
              tickets={tickets}
              selectedDay={selectedDay}
              onAddToCart={handleAddToCart}
              cart={cartSnap.items}
              onRemoveFromCart={(item_id, date) => {
                const item = cartSnap.items.find(
                  i => i.item_id === item_id && i.date === date
                );
                if (item) cartStore.removeItem(item);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}