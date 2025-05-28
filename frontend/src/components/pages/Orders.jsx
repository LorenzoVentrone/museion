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
        setOrders(data.orders || []);
        if (data.infoUser && Array.isArray(data.infoUser)) {
          setUserInfo(data.infoUser[0]);
        }
      })
      .catch(() => {
        router.push('/tickets');
      });
  }, [router]);

  const groupedOrders = orders.reduce((acc, order) => {
    const { order_id } = order;
    if (!acc[order_id]) {
      acc[order_id] = [];
    }
    acc[order_id].push(order);
    return acc;
  }, {});

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
          Your orders
        </h1>

        <div className="grid gap-8">
          {Object.entries(groupedOrders).map(([orderId, orderItems]) => (
            <div
              key={orderId}
              className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6"
            >
              <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
                <h2 className="text-2xl font-semibold">
                  Order #{orderId}
                </h2>
                <span className="text-sm text-gray-800">
                  {new Date(orderItems[0].order_date).toLocaleDateString('it-IT')}
                </span>
              </div>
              <ul>
                {orderItems.map((item, index) => {
                  const isMerch = item.type === 'hat' || item.type === 'shirt';
                  return (
                    <li
                      key={index}
                      className="py-2 border-b border-gray-200 flex flex-col md:flex-row md:justify-between text-gray-800"
                    >
                      <div>
                        <span className="font-medium">
                          {isMerch ? 'Merch:' : 'Ticket Type:'}
                        </span>{' '}
                        {item.type}
                        {isMerch && (
                          <>
                            {item.color && (
                              <span className="ml-2">
                                <span className="font-medium">Color:</span> {item.color}
                              </span>
                            )}
                            {item.logo && (
                              <span className="ml-2">
                                <span className="font-medium">Logo:</span> {item.logo}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      <div>
                        <span className="font-medium">Quantity:</span> {item.quantity}
                      </div>
                      <div>
                        <span className="font-medium">
                          {isMerch ? 'Data ordine:' : 'Data Visita:'}
                        </span>{' '}
                        {item.date
                          ? new Date(item.date).toLocaleDateString('it-IT')
                          : new Date(item.order_date).toLocaleDateString('it-IT')}
                      </div>
                      <div>
                        <span className="font-medium">Prezzo totale:</span>{' '}
                        {(Number(item.quantity) * Number(item.price)).toFixed(2)} €
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={() => generatePdfForOrder(orderId, orderItems)}
                className="mt-4 bg-white text-black font-semibold border border-black px-4 py-2 rounded hover:bg-black hover:text-white cursor-pointer"
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}