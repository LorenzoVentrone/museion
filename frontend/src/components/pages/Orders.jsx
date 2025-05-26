'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import generatePdf from '../utils/TicketGenerator';

export default function DashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/tickets/signin');
      return;
    }

    fetch('http://localhost:3001/orders/getOrders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Imposta gli ordini dalla response
        setOrders(data.orders || []);
        // Se infoUser è un array, prendi il primo elemento
        if (data.infoUser && Array.isArray(data.infoUser)) {
          setUserInfo(data.infoUser[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        router.push('/tickets');
      });
  }, [router]);

  // Raggruppa gli ordini in base all'order_id.
  const groupedOrders = orders.reduce((acc, order) => {
    const { order_id } = order;
    if (!acc[order_id]) {
      acc[order_id] = [];
    }
    acc[order_id].push(order);
    return acc;
  }, {});

  // Generazione del PDF per ogni ordine
  const generatePdfForOrder = (orderId, orderItems) => {
    generatePdf(orderId, orderItems, userInfo);
  };
  

  return (
    <div className="min-h-screen text-black py-8">
      <div className="container mx-auto px-4">
        {userInfo && (
          <div className="mb-8 p-4">
            <h2 className="text-4xl font-bold text-black">
              Welcome back {userInfo.first_name}
            </h2>
          </div>
        )}

        <h1 className="text-4xl font-bold text-center text-black mb-8">
          I tuoi ordini
        </h1>

        <div className="grid gap-8">
          {Object.entries(groupedOrders).map(([orderId, orderItems]) => (
            <div
              key={orderId}
              className=" rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6"
            >
              <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
                <h2 className="text-2xl font-semibold">
                  Ordine #{orderId}
                </h2>
                <span className="text-sm text-gray-800">
                  {new Date(orderItems[0].order_date).toLocaleDateString('it-IT')}
                </span>
              </div>
              <ul>
                {orderItems.map((item, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-200 flex justify-between text-gray-800"
                  >
                    <div>
                      <span className="font-medium">Ticket Type:</span>{' '}
                      {item.type}
                    </div>
                    <div>
                      <span className="font-medium">Quantità:</span>{' '}
                      {item.quantity}
                    </div>
                    <div>
                      <span className="font-medium">Data Visita:</span>{' '}
                      {new Date(orderItems[0].date).toLocaleDateString('it-IT')}
                    </div>
                    <div>
                      <span className="font-medium">Prezzo totale:</span>{' '}
                      {(Number(item.quantity) * Number(item.price)).toFixed(2)} €
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => generatePdfForOrder(orderId, orderItems)}
                className="mt-4 bg-white text-black font-semibold border border-black px-4 py-2 rounded hover:bg-black hover:text-white"
              >
                Scarica PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}