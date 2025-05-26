'use client';

import { useState, useEffect, useRef } from 'react';
import TicketCalendar from '../utils/Calendar';
import TicketList from '../utils/TicketList';
import TicketCart from '../utils/TicketCart';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/AuthProvider';

export default function TicketsPurchasePage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const router = useRouter();
  const { token } = useAuth();

  const ticketListRef = useRef(null);

  const handleDaySelect = (date) => {
    setSelectedDay(date);
    if (ticketListRef.current) {
      ticketListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (!selectedDay) return;

    setLoading(true);
    fetch(`http://localhost:3001/availability?date=${selectedDay}`)
      .then((res) => res.json())
      .then(setTickets)
      .catch(() => setTickets([]))
      .finally(() => setLoading(false));
  }, [selectedDay]);

  const handleAddToCart = (ticket) => {
    const existing = cart.find(
      (item) => item.ticket_id === ticket.ticket_id && item.date === selectedDay
    );

    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          item.ticket_id === ticket.ticket_id && item.date === selectedDay
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          ticket_id: ticket.ticket_id,
          date: selectedDay,
          quantity: 1,
          type: ticket.type,
          price: ticket.price,
        },
      ]);
    }
  };

  const handleRemoveFromCart = (ticketId, date) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.ticket_id === ticketId && item.date === date
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  useEffect(() => {
    // Mostra il carrello se ci sono elementi, nascondi se vuoto
    setCartVisible(cart.length > 0);
  }, [cart]);

  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    if (!token) {
      router.push('/tickets/signin?from=checkout');
      return;
    }
    router.push('/checkout');
  };

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl text-black font-bold text-center mb-4">Acquista biglietti</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Colonna sinistra: calendario e lista biglietti */}
        <div className="flex-1">
          <TicketCalendar onDaySelect={handleDaySelect} selectedDate={selectedDay} />
          {loading && <p>Caricamento...</p>}
          {!loading && selectedDay && (
            <div ref={ticketListRef}>
              <TicketList
                tickets={tickets}
                selectedDay={selectedDay}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}
        </div>

        {/* Colonna destra: carrello con animazione */}
        <div
          className={`transition-all duration-500 ease-in-out
            ${cartVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}
            flex-shrink-0 w-full md:w-96 p-4`}
          style={{ willChange: 'opacity, transform' }}
        >
          <TicketCart
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            total={total}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
  