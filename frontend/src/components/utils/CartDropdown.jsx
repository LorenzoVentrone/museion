import { useSnapshot } from 'valtio';
import { cartStore } from '@/components/store/cartStore';
import { useRouter } from 'next/navigation';
import { AiOutlineShopping } from 'react-icons/ai';
import { useRef, useState, useEffect } from 'react';

// CartDropdown component: shows a shopping cart icon with a badge and a dropdown with cart items (desktop)
export default function CartDropdown({ small = false }) {
  const cartSnap = useSnapshot(cartStore);
  const [open, setOpen] = useState(false); // Dropdown open state (desktop only)
  const ref = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  // Handle cart icon click: open dropdown on desktop, go to checkout on mobile/small
  const onClick = () => {
    const mobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (mobile || small) {
      router.push('/checkout'); // Go directly to checkout
    } else {
      setOpen(o => !o); // Toggle dropdown
    }
  };

  // Icon and badge sizing
  const iconSize = small ? 22 : 48;
  const badgePos = 'top-0 right-0';

  return (
    <div ref={ref} className={small ? '' : 'relative px-4 py-2'}>
      {/* Cart icon with badge */}
      <div
        onClick={onClick}
        className={`relative inline-block ${small ? '' : 'cursor-pointer'}`}
      >
        <AiOutlineShopping size={iconSize} color="black" />
        {cartSnap.items.length > 0 && (
          <span
            className={`${badgePos} absolute translate-x-1/4 -translate-y-1/4
                        bg-black text-white rounded-full text-[10px]
                        w-4 h-4 flex items-center justify-center`}
          >
            {cartSnap.items.reduce((s, it) => s + (it.quantity || 1), 0)}
          </span>
        )}
      </div>

      {/* Dropdown (desktop only) */}
      {open && !small && (
        <div
          className={`
            absolute z-50
            bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-[92vw] max-w-sm
            sm:bottom-auto sm:left-auto sm:translate-x-0 sm:right-0 sm:top-full sm:mt-2 sm:w-80
            bg-white border border-gray-300 rounded shadow-lg
            max-h-[80vh] overflow-y-auto p-0
          `}
          style={{ paddingInline: 8 }}
        >
          <div className="p-4">
            <h3 className="font-bold mb-2 text-black text-base">Cart</h3>

            {cartSnap.items.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">
                Cart is empty
              </p>
            ) : (
              <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                {cartSnap.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center
                               justify-between py-2 text-sm text-black gap-1"
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
                        {item.logo && (
                          <span className="ml-1">Logo: {item.logo}</span>
                        )}
                      </span>
                      {item.date && (
                        <span className="text-xs text-gray-500">
                          {item.date}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0 self-end sm:self-auto">
                      <button
                        className="px-2 text-lg font-bold"
                        onClick={e => {
                          e.stopPropagation();
                          cartStore.removeItem(item);
                        }}
                      >
                        −
                      </button>
                      <span className="mx-1">x{item.quantity}</span>
                      <button
                        className="px-2 text-lg font-bold"
                        onClick={e => {
                          e.stopPropagation();
                          cartStore.addItem({ ...item, quantity: 1 });
                        }}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 pt-0 border-gray-200">
            <button
              className="custom-btn-usable w-full mx-auto py-2"
              onClick={() => {
                setOpen(false);
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