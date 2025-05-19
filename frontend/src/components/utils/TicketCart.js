'use client'

export default function TicketCart({ cart, onRemoveFromCart, total, onCheckout }) {
    if (cart.length === 0) return null;
  
    return (
      <aside className="w-full md:w-[320px] md:sticky md:top-28 h-fit p-4 bg-[#fffaf4] border border-[#ecdcc3] shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Carrello</h2>
        <ul className="space-y-3 mb-4">
          {cart.map((item, index) => (
            <li
              key={index}
              className="p-4 bg-white border border-[#ddd0c8] rounded flex justify-between items-center"
            >
              <div>
                <p>{item.type} - {item.date}</p>
                <p className="text-sm">Quantità: {item.quantity} × €{item.price}</p>
              </div>
              <button
                onClick={() => onRemoveFromCart(item.ticket_id, item.date)}
                className="bg-white text-black border border-black px-2 py-1 rounded hover:bg-black hover:text-white"
              >
                -
              </button>
            </li>
          ))}
        </ul>
        <p className="text-right font-bold text-lg mb-4">Totale: €{total.toFixed(2)}</p>
        <button
          onClick={onCheckout}
          className="bg-white text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white w-full"
        >
          Vai al checkout
        </button>
      </aside>
    );
  }