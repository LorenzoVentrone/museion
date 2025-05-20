'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    country: '',
    zipcode: '',
    creditCard: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const firstErrorRef = useRef(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    } else {
      router.push('/tickets/signin?from=checkout');
    }
  }, [router]);

  const validateField = (name, value) => {
    if (!value.trim()) return 'Campo obbligatorio';
    if (name === 'creditCard' && !/^\d{13,19}$/.test(value.replace(/\s+/g, '')))
      return 'Numero carta non valido';
    if (name === 'expiry' && !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value))
      return 'Formato MM/AA richiesto';
    if (name === 'cvv' && !/^\d{3,4}$/.test(value))
      return 'CVV non valido';
    if (name === 'zipcode' && !/^\d{4,10}$/.test(value))
      return 'CAP non valido';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      const error = validateField(key, val);
      if (error) newErrors[key] = error;
    });

    if (!cart.length) return alert('Il carrello è vuoto');
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (firstErrorRef.current) firstErrorRef.current.focus();
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Devi effettuare l\'accesso per continuare');
      router.push('/tickets/signin?from=checkout');
      return;
    }

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cart,
        customer: formData,
        coupon: coupon || null,
      }),
    });

    if (res.ok) {
      router.push('/checkout/purchased');
    } else {
      let err;
      try {
        err = await res.json();
      } catch {
        err = { error: "Errore durante la creazione dell'ordine" };
      }
      alert(err.error || "Errore durante la creazione dell'ordine");
    }
  };

  const isSubmitDisabled =
    !formData.country || !formData.zipcode || !formData.creditCard ||
    !formData.expiry || !formData.cvv || Object.values(errors).some(err => err);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  useEffect(() => {
    const validCoupons = ["Luca5", "Edo5", "Funtori5"];
    if (coupon && validCoupons.includes(coupon)) {
      setDiscount(total * 0.05);
    } else {
      setDiscount(0);
    }
  }, [coupon, total]);

  const discountedTotal = total - discount;

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#2e2b28] py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Pagamento */}
        <div className="rounded-xl text-black shadow-lg p-8">
          <h1 className="text-3xl font-bold  mb-6">Checkout</h1>
          <form onSubmit={handleSubmitOrder} className="space-y-6" noValidate>
            {[
              { id: 'country', label: 'Paese', placeholder: 'Inserisci la nazione' },
              { id: 'zipcode', label: 'CAP', placeholder: 'Inserisci il CAP' },
              { id: 'creditCard', label: 'Carta di Credito', placeholder: 'Numero della carta' },
              { id: 'expiry', label: 'Scadenza', placeholder: 'MM/AA' },
              { id: 'cvv', label: 'CVV', placeholder: 'Codice CVV', type: 'password' },
            ].map(({ id, label, placeholder, type = 'text' }) => {
              const error = errors[id];
              return (
                <div key={id}>
                  <label htmlFor={id} className="block mb-1 font-semibold">{label}</label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    value={formData[id]}
                    onChange={handleInputChange}
                    aria-invalid={!!error}
                    aria-describedby={`${id}-error`}
                    ref={error && !firstErrorRef.current ? firstErrorRef : null}
                    className={`w-full px-4 py-3 rounded-md border transition-shadow bg-white
                      ${error ? 'border-red-500 shadow-red-200' : 'border-black focus:ring-orange-400'}
                    `}
                  />
                  {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
                </div>
              );
            })}
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full py-3 rounded-md font-semibold transition text-black  
                ${isSubmitDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-white border border-black hover:bg-black hover:text-white'}
              `}
            >
              Conferma ordine
            </button>
          </form>
        </div>

        {/* Riepilogo Ordine + Coupon */}
        <div className="rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-black mb-4">Riepilogo ordine</h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map(item => (
              <li key={item.ticket_id} className="py-2 flex justify-between text-gray-800">
                <span>{item.type} × {item.quantity}</span>
                <span>€ {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mb-6">
            <label htmlFor="coupon" className="block mb-1 font-medium text-black">Codice sconto</label>
            <input
              id="coupon"
              type="text"
              placeholder="Inserisci codice coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full px-4 py-2 border border-black bg-white rounded-md focus:ring-orange-400"
            />
            {discount > 0 && (
              <p className="mt-1 text-green-600 text-sm">
                Sconto applicato: -€{discount.toFixed(2)}
              </p>
            )}
          </div>
          <div className="text-lg font-semibold text-gray-800 border-t pt-4 flex justify-between">
            <span>Totale:</span>
            <span>€ {discountedTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
