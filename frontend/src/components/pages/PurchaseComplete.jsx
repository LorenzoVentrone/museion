// app/checkout/purchased/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------ tiny bouncing-dots loader ------------ */
const LoadingDots = () => (
  <div className="flex items-center justify-center gap-1">
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        className="block w-2 h-2 bg-[#2e2b28] rounded-full"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'loop',
          delay: i * 0.2,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

export default function PurchaseComplete() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [order,   setOrder]   = useState(null);

  /* fake API / cart-cleanup */
  useEffect(() => {
    localStorage.removeItem('cart');
    const t = setTimeout(() => {
      setOrder({
        id   : Math.floor(Math.random() * 1_000) + 1,
        date : new Date().toLocaleDateString('en-GB'),
      });
      setLoading(false);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#2e2b28] flex items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-lg font-medium">Loading</span>
            <LoadingDots />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .6, ease: [.45,.2,.2,1] }}
            className="w-full max-w-lg text-center space-y-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              Thank you for your purchase!
            </h1>

            <div className="space-y-1 text-lg">
              <p>
                <span className="font-semibold">Order&nbsp;#</span>
                {order.id}
              </p>
              <p>
                <span className="font-semibold">Date:&nbsp;</span>
                {order.date}
              </p>
            </div>

            <p className="text-gray-600">
              You can view and download your tickets anytime from your personal dashboard.
            </p>

            <button
              onClick={() => router.push('/shop/tickets/orders')}
              className="inline-block px-8 py-3 border border-black rounded-full
                         bg-white text-black font-medium transition
                         hover:bg-black hover:text-white cursor-pointer"
            >
              Go to my orders
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
