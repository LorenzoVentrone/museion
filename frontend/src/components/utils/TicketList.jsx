'use client'

export default function TicketList({ tickets, selectedDay, onAddToCart, cart = [], onRemoveFromCart }) {
  // Helper per trovare la quantità di biglietti di quel tipo già aggiunti per quel giorno
  const getQuantity = (ticket) => {
    const found = cart.find(
      (item) => item.ticket_id === ticket.ticket_id && item.date === selectedDay
    );
    return found ? found.quantity : 0;
  };

  return (
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-2 text-black flex justify-center text-center">Tickets for {selectedDay}</h2>
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets available for this day.</p>
      ) : (
        <ul className="space-y-3">
          {tickets.map((ticket) => {
            const quantity = getQuantity(ticket);
            return (
              <li
                key={ticket.ticket_id}
                className="p-4 border border-[#ddd0c8] rounded-lg bg-white shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-[#2d2d2d]">{ticket.type}</p>
                  <p className="text-sm text-[#555]">Price: €{ticket.price}</p>
                  <p className="text-sm text-[#555]">Available: {ticket.availability}</p>
                </div>
                <div className="flex items-center gap-2">
                  {quantity > 0 && (
                    <span className="text-base font-mono text-gray-700 px-1 select-none">
                      {quantity}
                    </span>
                  )}
                  {quantity > 0 && (
                    <button
                      className="bg-white border border-black text-black px-3 py-1 rounded hover:bg-black hover:text-white transition cursor-pointer"
                      onClick={() => onRemoveFromCart(ticket.ticket_id, selectedDay)}
                    >
                      -
                    </button>
                  )}
                  <button
                    className="bg-white border border-black text-black px-3 py-1 rounded hover:bg-black hover:text-white transition cursor-pointer"
                    onClick={() => onAddToCart(ticket)}
                  >
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}