'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
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
        router.push('/login');
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Mostra le info utente se disponibili */}
        {userInfo && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-4xl font-bold text-blue-800">
              Ciao {userInfo.first_name}
            </h2>
            <p className="text-gray-700">Email: {userInfo.email}</p>
          </div>
        )}

        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          I tuoi ordini
        </h1>

        <div className="grid gap-8">
          {Object.entries(groupedOrders).map(([orderId, orderItems]) => (
            <div
              key={orderId}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6"
            >
              <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
                <h2 className="text-2xl font-semibold text-blue-700">
                  Ordine #{orderId}
                </h2>
                <span className="text-sm text-gray-600">
                  {orderItems[0].order_date}
                </span>
              </div>
              <ul>
                {orderItems.map((item, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-200 flex justify-between text-gray-700"
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
                      <span className="font-medium">Prezzo totale:</span>{' '}
                      {(Number(item.quantity) * Number(item.price)).toFixed(2)} €
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}