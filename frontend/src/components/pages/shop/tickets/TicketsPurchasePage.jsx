'use client';

import { useState, useEffect, useRef } from 'react';
import TicketCalendar from '@/components/utils/Calendar';
import TicketList from '@/components/utils/TicketList';
import TicketCart from '@/components/utils/TicketCart';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/utils/AuthProvider';

function AnimatedTitle({ text }) {
  return (
    <h1 className="cinzel-decorative-black text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-tight text-[#181818]">
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

  // Usa SEMPRE item_id invece di ticket_id
  const handleAddToCart = (ticket) => {
    const existing = cart.find(
      (item) => item.item_id === ticket.item_id && item.date === selectedDay
    );

    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          item.item_id === ticket.item_id && item.date === selectedDay
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          item_id: ticket.item_id,
          date: selectedDay,
          quantity: 1,
          type: ticket.type,
          price: ticket.price,
        },
      ]);
    }
  };

  const handleRemoveFromCart = (itemId, date) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.item_id === itemId && item.date === date
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  useEffect(() => {
    setCartVisible(cart.length > 0);
  }, [cart]);

  const handleCheckout = () => {
    if (!token) {
      router.push('/shop/tickets/signin?from=checkout');
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/checkout');
  };

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <AnimatedTitle text="Book your tickets" />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Colonna sinistra: calendario e lista biglietti */}
        <div className="flex-1">
          <TicketCalendar onDaySelect={handleDaySelect} selectedDate={selectedDay} />
          {loading && <p>Loading...</p>}
          {!loading && selectedDay && (
            <div ref={ticketListRef}>
              <TicketList
                tickets={tickets}
                selectedDay={selectedDay}
                onAddToCart={handleAddToCart}
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
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
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}