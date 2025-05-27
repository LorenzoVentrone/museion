'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { validateField } from '../utils/InputValidator';
import { FiMinus, FiPlus, FiX , FiArrowDown, FiArrowUp} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [mode, setMode] = useState('cart'); 
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

  // Varianti per animazione (opzionale)
  const slideVariant = {
    hiddenRight: { x: '100%', opacity: 0 },
    hiddenLeft: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
  };
   const motionProps = (direction = 'forward') => ({
    variants: slideVariant,
    initial: direction === 'forward' ? "hiddenRight" : "hiddenLeft",
    animate: "visible",
    exit: direction === 'forward' ? "hiddenLeft" : "hiddenRight",
    transition: { duration: 0.5, ease: [0.45, 0.2, 0.2, 1] }
   });


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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Valida subito o al cambio di step/submit
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const goToShipping = () => {
    if (!cart.length) {
      toast('Empty cart.');
      return;
    }
    setMode('shipping');
  };

  const goToPayment = () => {
    const shippingFieldsToValidate = ['address','province','city','country', 'zipcode'];
    let newErrors = {};
    shippingFieldsToValidate.forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(prev => ({ ...prev, ...newErrors }));

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = shippingFieldsToValidate.find(key => newErrors[key]);
      if (firstErrorKey) document.getElementById(firstErrorKey)?.focus();
      return;
    }
    setMode('payment');
  };
  
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const allFieldsToValidate = ['country', 'zipcode','city', 'creditCard', 'expiry', 'cvv'];
    let newErrors = {};
    allFieldsToValidate.forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = allFieldsToValidate.find(key => newErrors[key]);
      if (firstErrorKey) document.getElementById(firstErrorKey)?.focus();
      return;
    }

    if (!cart.length) return toast.error('Il carrello è vuoto');

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Devi effettuare l\'accesso per continuare');
      router.push('/tickets/signin?from=checkout');
      return;
    }

    //api for post request
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
      router.push('/checkout/purchased');
    } else {
      let err;
      try {
        err = await res.json();
      } catch {
        err = { error: "Errore durante la creazione dell'ordine" };
      }
      toast.error(err.error || "Errore durante la creazione dell'ordine");
    }
  };
  
  const isFinalSubmitDisabled = () => {
    const requiredFields = ['country', 'zipcode','city','creditCard', 'expiry', 'cvv'];
    for (const field of requiredFields) {
      if (!formData[field] || errors[field]) {
        return true;
      }
    }
    return false;
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  useEffect(() => {
    const validCoupons = ["Luca5", "Edo5", "Funtori5","TWS30"];
    if (coupon && validCoupons.includes(coupon)) {
      if(coupon!=="TWS30"){
        setDiscount(total * 0.05);
      } else setDiscount(total * 0.3)
    } else {
      setDiscount(0);
    }
  }, [coupon, total]);

  const discountedTotal = total - discount;

  // input helper
  const renderInputField = (id, label, placeholder, type = 'text') => {
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
          className={`w-full px-4 py-3 rounded-md border transition-shadow bg-white
            ${error ? 'border-red-500 shadow-red-200' : 'border-black focus:ring-orange-400 focus:border-orange-400'}
          `}
        />
        {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };

    // quantity +/-
  const updateQuantity = (ticket_id, delta) => {
    const newCart = cart.map(item =>
      item.ticket_id === ticket_id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // item clear
  const removeItem = ticket_id => {
    const newCart = cart.filter(item => item.ticket_id !== ticket_id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // clear
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  function getTicketImageUrl(ticketId) {
    switch(ticketId) {
        case '1':
            return '/images/Ticket.png';
        // Aggiungere le magliette
        default:
            return '/images/Ticket.png';
    }
}

  return (
    <div className="min-h-screen bg-white text-[#2e2b28] py-12 px-4">
      {/*checkout step*/}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex justify-between text-sm font-medium text-gray-500">
          <button
            onClick={() => setMode('cart')}
            className={mode === 'cart' ? 'text-orange-600 cursor-pointer' : 'cursor-pointer'}>
            Cart
          </button>
          <button
            onClick={() => setMode('shipping')}
            className={mode === 'shipping' ? 'text-orange-600 cursor-pointer' : 'cursor-pointer'}>
            Shipping
          </button>
          <button
            onClick={() => setMode('payment')}
            className={mode === 'payment' ? 'text-orange-600 cursor-pointer' : 'cursor-pointer'}>
            Checkout
          </button>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-orange-500 rounded-full transition-all duration-300 ease-out"
            style={{
              width: mode === 'cart' ? '10%' : mode === 'shipping' ? '50%' : '100%',
            }}
          ></div>
        </div>
      </div>
      
      <div className="relative overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            {...motionProps('forward')}
            className="max-w-2xl mx-auto"
          >
            {mode === 'cart' && (
            <>
              {/* header con titolo e clear */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Cart <span className="text-gray-500 text-base">({cart.length} items)</span></h1>
                <button
                  onClick={clearCart}
                  className="flex items-center text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <FiX className="mr-1"/> Clear cart
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div
                      key={`${item.item_id}-${item.date}`}
                      className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                    >
                      {/* thumbnail + info */}
                      <div className="flex items-center gap-4">
                        <img
                          src={getTicketImageUrl(item.ticketId)}           // o item.image
                          alt={item.type}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-semibold">{item.type}</p>
                          {item.color && <p className="text-gray-500 text-sm">{item.color}</p>}
                        </div>
                      </div>

                      {/* quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.ticket_id, -1)}
                          className="p-1 rounded border hover:bg-gray-100 cursor-pointer"
                        >
                          <FiMinus />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.ticket_id, +1)}
                          className="p-1 rounded border hover:bg-gray-100 cursor-pointer"
                        >
                          <FiPlus />
                        </button>
                      </div>

                      {/* price + remove */}
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.ticket_id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <FiX />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {cart.length > 0 && (
                <button
                  onClick={goToShipping}
                  className="mt-6 w-full py-3 bg-black text-white rounded-md font-semibold hover:bg-orange-500 transition cursor-pointer"
                >
                  Go to shipping details
                </button>
              )}
            </>
          )}

            {mode === 'shipping' && (
              <>
                <h1 className="text-3xl font-bold mb-8 text-center">Shipping details</h1>
                <form onSubmit={e => { e.preventDefault(); goToPayment(); }} className="space-y-6" noValidate>
                  {renderInputField('country', 'Country', 'Insert your country')}
                  {renderInputField('city', 'City', 'Insert your city')}
                  {renderInputField('address', 'Address', 'Insert your address')}
                  {renderInputField('province', 'Province/State', 'Insert your province/state')}
                  {renderInputField('zipcode', 'ZIP Code', 'Insert your ZIP code')}
                  
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setMode('cart')}
                      className="w-1/2 py-3 rounded-md font-semibold transition border border-gray-400 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 rounded-md font-semibold transition bg-black text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              </>
            )}

            {mode === 'payment' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Payment form */}
                <div className="bg-white rounded-xl text-black shadow-xl p-8">
                  <h1 className="text-3xl font-bold mb-8">Payment Details</h1>
                  <form className="space-y-6" noValidate>
                    {renderInputField('name', 'Name on card', 'First&Last name')}
                    {renderInputField('creditCard', 'Card Number', 'Card Number')}
                    {renderInputField('expiry', '	Expiry Date', 'MM/AA')}
                    {renderInputField('cvv', 'CVV', 'CVV Code', 'password')}
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setMode('shipping')}
                        className="block w-1/2 mx-auto py-3 rounded-md font-semibold transition border border-gray-400 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
                      >
                        Back to shipping details
                      </button>
                    </div>
                  </form>
                </div>
                {/* Desktop order summary (in-line) */}
                <div className="hidden md:block bg-white rounded-xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>
                  <div className="mb-4 border-b border-gray-300 pb-4">
                    <h3 className="font-semibold text-black mb-2">Shipping address:</h3>
                    <p className="text-gray-700">{formData.address || 'No city details'}</p>
                    <p className="text-gray-700">
                      {`${formData.city || 'City not specified'}${formData.province ? ', ' + formData.province : ''}`}
                    </p>
                    <p className="text-gray-700">{formData.country || 'Country not specified'}</p>
                    <p className="text-gray-700">{formData.zipcode || 'ZIP code not specified'}</p>
                  </div>
                  <ul className="divide-y divide-gray-300 mb-4">
                    {cart.map(item => (
                      <li key={`${item.item_id}-${item.date}`} className="py-3 flex justify-between text-gray-800">
                        <span>{item.type} × {item.quantity}</span>
                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border transition-shadow bg-white border-black focus:ring-orange-400 focus:border-orange-400"
                  />
                  {coupon && discount > 0 && (
                    <p className="mt-2 text-sm text-green-600">
                      Coupon "{coupon}" applied! You've saved €{discount.toFixed(2)}.
                    </p>
                  )}
                  <div className="text-xl font-bold text-gray-800 border-t border-gray-300 pt-4 flex justify-between">
                    <span>Final Total:</span>
                    <span>€{discountedTotal.toFixed(2)}</span>
                  </div>
                  <button
                    type="button"
                    disabled={isFinalSubmitDisabled()}
                    className={`w-full py-3 mt-2 rounded-md font-semibold transition text-white ${
                      isFinalSubmitDisabled()
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-black hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer'
                    }`}
                    onClick={handleSubmitOrder}
                  >
                    Confirm Order
                  </button>
                </div>

                {/* Mobile fixed order summary with toggle */}
                <div className="fixed bottom-0 left-0 w-full bg-gray-500 border-t border-gray-300 md:hidden">
                  <div className="flex items-center justify-between p-4">
                    <div className="text-xl font-bold text-white">
                      Final Total: €{discountedTotal.toFixed(2)}
                    </div>
                    <button
                        type="button"
                        disabled={isFinalSubmitDisabled()}
                        className={`w-1/2 py-3 mt-2 rounded-md font-semibold transition text-black ${
                          isFinalSubmitDisabled()
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500'
                        }`}
                        onClick={handleSubmitOrder}
                      >
                        Confirm Order
                    </button>
                    <button onClick={() => setShowSummary(prev => !prev)} className="text-white">
                      {showSummary ? <FiArrowDown/> : <FiArrowUp/>}
                    </button>
                  </div>
                  {showSummary && (
                    <div className="p-4 border-t border-white">
                      <div className='mb-4 text-white'>
                        <span className='text-xl text-white font-bold'>Shipping details</span>
                        <ul>
                          <span>{`${formData.address} `}</span>
                          <span>{`${formData.city} `}</span>
                          <span>{`${formData.province} `}</span>
                          <span>{`${formData.zipcode} `}</span>
                        </ul>
                      </div>
                      <span className='text-xl text-white font-bold'>Order Recap</span>
                      <ul className="divide-y divide-gray-200 mb-4">
                        {cart.map(item => (
                          <li key={`${item.item_id}-${item.date}`} className="py-3 flex justify-between text-white">
                            <span>{item.type} × {item.quantity}</span>
                            <span>€{(item.price * item.quantity).toFixed(2)}</span>
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