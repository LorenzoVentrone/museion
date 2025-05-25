'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PurchasedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Pulisce il carrello dopo l'acquisto
    localStorage.removeItem('cart');

    // Simula il caricamento dei dati dell'ordine
    setTimeout(() => {
      setOrderDetails({
        orderId: Math.floor(Math.random() * 1000) + 1,
        orderDate: new Date().toLocaleDateString('it-IT'),
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen text-center bg-[#fdfaf6] text-[#2e2b28]">
        <p className="text-lg italic">Caricamento in corso...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#2e2b28] font-serif">
      <div className='p-15'>
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">
          Grazie per il tuo acquisto
        </h1>
        <div className="text-center mb-6">
          <p className="text-lg">
            <span className="font-medium">Ordine #</span>
            {orderDetails.orderId}
          </p>
          <p className="text-lg">
            <span className="font-medium">Data:</span> {orderDetails.orderDate}
          </p>
        </div>
        <p className="text-center mb-6 text-gray-600">
          Puoi visualizzare e scaricare i tuoi biglietti direttamente dalla tua area personale.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => router.push('/shop/tickets/orders')}
            className="bg-white text-black border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
          >
            Vai ai miei ordini
          </button>
        </div>
      </div>
    </div>
  );
}
