'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { validateField } from '../utils/InputValidator';   // <-- percorso come nel primo file
import {
  FiMinus,
  FiPlus,
  FiX,
  FiArrowDown,
  FiArrowUp,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { cartStore } from '@/components/store/cartStore';   // <-- rimasto dal primo file

export default function CheckoutPage() {
  const router = useRouter();

  /* ------------------------- STATE ------------------------- */
  const [cart, setCart] = useState([]);
  const [mode, setMode] = useState('cart'); // cart | shipping | payment
  const [formData, setFormData] = useState({
    country: '',
    zipcode: '',
    city: '',
    address: '',
    province: '',
    creditCard: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [errors, setErrors] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  /* ---------------------- ANIMAZIONI ----------------------- */
  const slideVariant = {
    hiddenRight: { x: '100%', opacity: 0 },
    hiddenLeft: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  const motionProps = (direction = 'forward') => ({
    variants: slideVariant,
    initial: direction === 'forward' ? 'hiddenRight' : 'hiddenLeft',
    animate: 'visible',
    exit: direction === 'forward' ? 'hiddenLeft' : 'hiddenRight',
    transition: { duration: 0.5, ease: [0.45, 0.2, 0.2, 1] },
  });

  /* -------------------- LOAD CART / LOGIN ------------------ */
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));

    const token = localStorage.getItem('token');
    if (token) setIsLogged(true);
    else router.push('/shop/tickets/signin?from=checkout'); // path del 1° file
  }, [router]);

  /* ------------------- HANDLER GENERICI -------------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  /* -------------------- STEP NAVIGATION -------------------- */
  const goToShipping = () => {
    if (!cart.length) return toast('Empty cart.');
    setMode('shipping');
  };

  const goToPayment = () => {
    const shippingFields = [
      'address',
      'province',
      'city',
      'country',
      'zipcode',
    ];
    let newErrors = {};
    shippingFields.forEach((k) => {
      const err = validateField(k, formData[k]);
      if (err) newErrors[k] = err;
    });
    setErrors((prev) => ({ ...prev, ...newErrors }));

    if (Object.keys(newErrors).length) {
      const first = shippingFields.find((k) => newErrors[k]);
      if (first) document.getElementById(first)?.focus();
      return;
    }
    setMode('payment');
  };

  /* ------------------- SUBMIT ORDINE ----------------------- */
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const allFields = [
      'country',
      'zipcode',
      'city',
      'creditCard',
      'expiry',
      'cvv',
    ];
    let newErrors = {};
    allFields.forEach((k) => {
      const err = validateField(k, formData[k]);
      if (err) newErrors[k] = err;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      const first = allFields.find((k) => newErrors[k]);
      if (first) document.getElementById(first)?.focus();
      return;
    }

    if (!cart.length) return toast.error('Il carrello è vuoto');

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Devi effettuare il login');
      router.push('/shop/tickets/signin?from=checkout');
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
      localStorage.removeItem('cart');
      cartStore.clear();                     // <-- dal 1° file
      router.push('/checkout/purchased');    // <-- path del 1° file
    } else {
      let err;
      try {
        err = await res.json();
      } catch {
        err = { error: "Errore durante la creazione dell'ordine" };
      }
      toast.error(err.error || "Errore durante l'ordine");
    }
  };

  const isFinalSubmitDisabled = () => {
    const required = [
      'country',
      'zipcode',
      'city',
      'creditCard',
      'expiry',
      'cvv',
    ];
    return required.some((f) => !formData[f] || errors[f]);
  };

  /* --------------------- COUPON LOGIC ---------------------- */
  const total = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);

  useEffect(() => {
    const validCoupons = ['Luca5', 'Edo5', 'Funtori5', 'TWS30'];
    if (coupon && validCoupons.includes(coupon)) {
      setDiscount(coupon === 'TWS30' ? total * 0.3 : total * 0.05);
    } else setDiscount(0);
  }, [coupon, total]);

  const discountedTotal = total - discount;

  /* --------------------- CART HELPERS ---------------------- */
  // ====> logica “avanzata” del 1° file (item può essere ticket o merch)
  const itemKey = (it) =>
    [
      it.item_id,                     // id generico
      it.date ? it.date.slice(0, 10) : '',
      it.color ?? '',
      it.logo ?? '',
      it.type ?? '',
    ].join('-');

  const sameItem = (a, b) =>
    a.item_id === b.item_id &&
    (a.date ?? null) === (b.date ?? null) &&
    a.type === b.type &&
    (a.color ?? null) === (b.color ?? null) &&
    (a.logo ?? null) === (b.logo ?? null);

  const updateQuantity = (item, delta) => {
    const newCart = cart.map((i) =>
      sameItem(i, item)
        ? { ...i, quantity: Math.max(1, i.quantity + delta) }
        : i
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (item) => {
    const newCart = cart.filter((i) => !sameItem(i, item));
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getItemImageUrl = (itemId) => {
    switch (itemId) {
      case '1':
        return '/images/Ticket.png';
      default:
        return '/images/Ticket.png';
    }
  };

  const renderItemInfo = (item) => (
    <span>
      {item.type}
      {item.date && ` - ${item.date}`}
      {item.color && (
        <span
          className="inline-block w-4 h-4 rounded-full border ml-2 align-middle"
          style={{ background: item.color }}
          title={item.color}
        />
      )}
      {item.logo && (
        <span className="ml-2 text-xs text-gray-600">Logo: {item.logo}</span>
      )}
    </span>
  );

  /* ----------------- RENDER INPUT HELPER -------------------- */
  const renderInputField = (id, label, placeholder, type = 'text') => {
    const error = errors[id];
    return (
      <div key={id}>
        <label htmlFor={id} className="block mb-1 font-semibold">
          {label}
        </label>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={formData[id]}
          onChange={handleInputChange}
          aria-invalid={!!error}
          aria-describedby={`${id}-error`}
          className={`w-full px-4 py-3 rounded-md border bg-white transition-shadow
            ${
              error
                ? 'border-red-500 shadow-red-200'
                : 'border-black focus:ring-orange-400 focus:border-orange-400'
            }`}
        />
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  };

  /* ========================= JSX ========================== */
  return (
    <div className="min-h-screen bg-white text-[#2e2b28] py-12 px-4">
      {/* ---------- STEP HEADER (design del 2° file) ---------- */}
      <div className="max-w-2xl mx-auto mb-10 mt-5">
        <div className="grid grid-cols-3 text-center text-sm font-medium text-gray-500">
          <button
            onClick={() => setMode('cart')}
            className={mode === 'cart' ? 'text-gray-800' : 'cursor-pointer'}
          >
            Cart
          </button>
          <button
            onClick={() => setMode('shipping')}
            className={mode === 'shipping' ? 'text-gray-800' : 'cursor-pointer'}
          >
            Shipping
          </button>
          <button
            onClick={() => setMode('payment')}
            className={mode === 'payment' ? 'text-gray-800' : 'cursor-pointer'}
          >
            Checkout
          </button>
        </div>

        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300 ease-out"
            style={{
              width:
                mode === 'cart'
                  ? '17%'
                  : mode === 'shipping'
                  ? '50%'
                  : '100%',
            }}
          />
        </div>
      </div>

      {/* ---------- CONTENUTO DINAMICO ---------- */}
      <div className="relative overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            {...motionProps('forward')}
            className="max-w-2xl mx-auto"
          >
            {/* ================ CART ================ */}
            {mode === 'cart' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold">
                    Cart{' '}
                    <span className="text-gray-500 text-base">
                      ({cart.length} items)
                    </span>
                  </h1>
                  <button
                    onClick={clearCart}
                    className="flex items-center text-red-500 hover:text-red-700"
                  >
                    <FiX className="mr-1" />
                    Clear cart
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="text-center text-gray-600">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={itemKey(item)}
                        className="grid grid-cols-[minmax(0,1fr)_112px_auto] items-center
                                   bg-white p-4 rounded-lg shadow gap-4"
                      >
                        {/* thumbnail + info */}
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={getItemImageUrl(item.item_id)}
                            alt={item.type}
                            className="w-16 h-16 object-cover rounded-md shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold truncate">
                              {renderItemInfo(item)}
                            </p>
                          </div>
                        </div>

                        {/* qty controls */}
                        <div className="flex items-center justify-start gap-2">
                          <button
                            onClick={() => updateQuantity(item, -1)}
                            className="p-1 rounded border hover:bg-gray-100"
                          >
                            <FiMinus />
                          </button>
                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item, +1)}
                            className="p-1 rounded border hover:bg-gray-100"
                          >
                            <FiPlus />
                          </button>
                        </div>

                        {/* price + remove */}
                        <div className="flex items-center gap-4 justify-end">
                          <span className="font-semibold">
                            €{(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiX />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <div className="max-w-2xl mx-auto flex justify-center mt-3">
                    <button
                      onClick={goToShipping}
                      className="custom-btn-usable px-10 py-5"
                    >
                      Go to shipping details
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ============== SHIPPING ============== */}
            {mode === 'shipping' && (
              <>
                <h1 className="text-3xl font-bold mb-8 text-center">
                  Shipping details
                </h1>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    goToPayment();
                  }}
                  className="space-y-6"
                  noValidate
                >
                  {renderInputField(
                    'country',
                    'Country',
                    'Insert your country'
                  )}
                  {renderInputField('city', 'City', 'Insert your city')}
                  {renderInputField(
                    'address',
                    'Address',
                    'Insert your address'
                  )}
                  {renderInputField(
                    'province',
                    'Province / State',
                    'Insert your province/state'
                  )}
                  {renderInputField(
                    'zipcode',
                    'ZIP Code',
                    'Insert your ZIP code'
                  )}

                  <div className="flex justify-between gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setMode('cart')}
                      className="custom-btn-usable px-10 py-5"
                    >
                      Back to Cart
                    </button>
                    <button type="submit" className="custom-btn-usable px-10 py-5">
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* ============== PAYMENT ============== */}
            {mode === 'payment' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* form pagamento */}
                <div className="bg-white rounded-xl text-black shadow-xl p-8">
                  <h1 className="text-3xl font-bold mb-8">Payment Details</h1>
                  <form className="space-y-6" noValidate>
                    {renderInputField(
                      'name',
                      'Name on card',
                      'First & Last name'
                    )}
                    {renderInputField(
                      'creditCard',
                      'Card Number',
                      'Card Number'
                    )}
                    {renderInputField(
                      'expiry',
                      'Expiry Date',
                      'MM/AA'
                    )}
                    {renderInputField('cvv', 'CVV', 'CVV Code', 'password')}
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setMode('shipping')}
                        className="custom-btn-usable px-5 py-3"
                      >
                        Back to shipping details
                      </button>
                    </div>
                  </form>
                </div>

                {/* order summary desktop */}
                <div className="hidden md:block bg-white rounded-xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-black mb-6">
                    Order Summary
                  </h2>

                  <div className="mb-4 border-b border-gray-300 pb-4">
                    <h3 className="font-semibold text-black mb-2">
                      Shipping address:
                    </h3>
                    <p className="text-gray-700">
                      {formData.address || 'No address'}
                    </p>
                    <p className="text-gray-700">
                      {formData.city || '—'}
                      {formData.province && `, ${formData.province}`}
                    </p>
                    <p className="text-gray-700">{formData.country || '—'}</p>
                    <p className="text-gray-700">{formData.zipcode || '—'}</p>
                  </div>

                  {/* items */}
                  <ul className="divide-y divide-gray-300 mb-4">
                    {cart.map((it) => (
                      <li
                        key={itemKey(it)}
                        className="py-3 flex justify-between text-gray-800"
                      >
                        <span>{renderItemInfo(it)} × {it.quantity}</span>
                        <span>€{(it.price * it.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* coupon */}
                  <span className="font-bold">Coupon</span>
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border bg-white border-black focus:ring-orange-400 focus:border-orange-400"
                  />
                  {coupon && discount > 0 && (
                    <p className="mt-2 text-sm text-green-600">
                      Coupon “{coupon}” applied! You saved €
                      {discount.toFixed(2)}.
                    </p>
                  )}

                  {/* totale */}
                  <div className="text-xl font-bold text-gray-800 border-t border-gray-300 pt-4 flex justify-between">
                    <span>Final Total:</span>
                    <span>€{discountedTotal.toFixed(2)}</span>
                  </div>

                  <button
                    type="button"
                    disabled={isFinalSubmitDisabled()}
                    className={`w-full py-3 mt-2 rounded-md font-semibold text-white transition
                      ${
                        isFinalSubmitDisabled()
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'custom-btn-usable'
                      }`}
                    onClick={handleSubmitOrder}
                  >
                    Confirm Order
                  </button>
                </div>

                {/* summary mobile */}
                <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-300 md:hidden">
                  <div className="flex items-center justify-between p-4">
                    <div className="text-xl font-bold text-white">
                      Total: €{discountedTotal.toFixed(2)}
                    </div>

                    <button
                      type="button"
                      disabled={isFinalSubmitDisabled()}
                      className={`w-1/2 py-3 rounded-md font-semibold transition text-black
                        ${
                          isFinalSubmitDisabled()
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'custom-btn-usable'
                        }`}
                      onClick={handleSubmitOrder}
                    >
                      Confirm Order
                    </button>

                    <button
                      onClick={() => setShowSummary((p) => !p)}
                      className="text-white"
                    >
                      {showSummary ? <FiArrowDown /> : <FiArrowUp />}
                    </button>
                  </div>

                  {showSummary && (
                    <div className="p-4 border-t border-white">
                      <div className="mb-4 text-white">
                        <span className="text-xl font-bold">
                          Shipping details
                        </span>
                        <ul>
                          <li>
                            {formData.address} {formData.city}{' '}
                            {formData.province} {formData.zipcode}
                          </li>
                        </ul>
                      </div>

                      <span className="text-xl text-white font-bold">
                        Order Recap
                      </span>
                      <ul className="divide-y divide-gray-200 mb-4">
                        {cart.map((it) => (
                          <li
                            key={itemKey(it)}
                            className="py-3 flex justify-between text-white"
                          >
                            <span>
                              {renderItemInfo(it)} × {it.quantity}
                            </span>
                            <span>
                              €{(it.price * it.quantity).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
