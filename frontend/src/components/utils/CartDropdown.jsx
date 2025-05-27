import { useSnapshot } from 'valtio';
import { cartStore } from '@/components/store/cartStore';
import { useRouter } from 'next/navigation';
import { AiOutlineShopping } from 'react-icons/ai';
import { useRef, useState, useEffect } from 'react';

export default function CartDropdown() {
  const cartSnap = useSnapshot(cartStore);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);
  const router = useRouter();

  // Chiudi il dropdown se clicchi fuori
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    }
    if (cartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [cartOpen]);

  return (
    <div className="pointer-events-auto cursor-pointer px-4 py-2 relative" ref={cartRef}>
      <div onClick={() => setCartOpen(v => !v)} className="relative inline-block">
        <AiOutlineShopping size="3em" color="black" />
        {cartSnap.items.length > 0 && (
          <span
            className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            {cartSnap.items.reduce((sum, item) => sum + (item.quantity || 1), 0)}
          </span>
        )}
      </div>
      {cartOpen && (
        <div
          className={`
      absolute right-0 mt-2
      w-[90vw] max-w-sm
      bg-white border border-gray-300 rounded shadow-lg z-50
      sm:w-80 sm:left-auto sm:translate-x-0
      left-1/2 -translate-x-1/2
      transition-all
      duration-200
      max-h-[80vh]
      overflow-y-auto
      p-0
    `}
          style={{ marginLeft: 'auto', marginRight: 'auto', paddingLeft: 8, paddingRight: 8 }}
        >
          <div className="p-4">
            <h3 className="font-bold mb-2 text-black text-lg sm:text-base">Cart</h3>
            {cartSnap.items.length === 0 ? (
              <p className="text-gray-500 text-base sm:text-sm text-center py-6">Cart is empty</p>
            ) : (
              <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                {cartSnap.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-2 text-base sm:text-sm text-black gap-1"
                  >
                    <div className="flex flex-col w-full">
                      <span className="truncate">
                        {item.type}
                        {item.color && (
                          <span
                            style={{ background: item.color }}
                            className="inline-block w-3 h-3 rounded-full mx-1 border"
                          />
                        )}
                        {item.logo && <span className="ml-1">Logo: {item.logo}</span>}
                      </span>
                      {item.date && (
                        <span className="text-xs text-gray-500">{item.date}</span>
                      )}
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0 self-end sm:self-auto">
                      <button
                        className="px-2 text-lg font-bold"
                        onClick={e => {
                          e.stopPropagation();
                          cartStore.removeItem(item);
                        }}
                      >−</button>
                      <span className="mx-1">x{item.quantity}</span>
                      <button
                        className="px-2 text-lg font-bold"
                        onClick={e => {
                          e.stopPropagation();
                          cartStore.addItem({ ...item, quantity: 1 });
                        }}
                      >+</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-4 pt-0 border-t border-gray-200">
            <button
              className="w-full bg-black text-white py-3 rounded text-lg font-semibold hover:bg-orange-500 transition"
              onClick={() => {
                setCartOpen(false);
                router.push('/checkout');
              }}
            >
              Go to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}