'use client'

// Renders the ticket cart sidebar. If the cart is empty, returns null.
export default function TicketCart({ cart, onRemoveFromCart, onAddToCart, total, onCheckout }) {
    if (cart.length === 0) return null;
  
    return (
      <aside className="w-full md:w-[320px] md:sticky md:top-28 h-fit p-4 bg-[#fffaf4] border border-[#ecdcc3] shadow-md rounded-lg">
        {/* Cart title */}
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        <ul className="space-y-3 mb-4">
          {cart.map((item, index) => (
            <li
              key={index}
              className="p-4 bg-white border border-[#ddd0c8] rounded flex justify-between items-center"
            >
              <div>
                {/* Ticket type and date */}
                <p>{item.type} - {item.date}</p>
                {/* Quantity and price */}
                <p className="text-sm flex items-center gap-2">
                  Quantity: 
                  <button
                    onClick={() => onRemoveFromCart(item.ticket_id, item.date)}
                    className="ml-2 bg-white text-black border border-black px-2 py-1 rounded hover:bg-black hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => onAddToCart({ ...item, date: item.date })}
                    className="bg-white text-black border border-black px-2 py-1 rounded hover:bg-black hover:text-white"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  × €{item.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {/* Total price */}
        <p className="text-right font-bold text-lg mb-4">Total: €{total.toFixed(2)}</p>
        {/* Checkout button */}
        <button
          onClick={onCheckout}
          className="bg-white text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white w-full"
        >
          Go to checkout
        </button>
      </aside>
    );
}