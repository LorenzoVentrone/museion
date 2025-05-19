'use client'

export default function TicketList({ tickets, selectedDay, onAddToCart }) {
    return (
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">Biglietti per il {selectedDay}</h2>
        <ul className="space-y-3">
          {tickets.map((ticket) => (
            <li
              key={ticket.ticket_id}
              className="p-4 border border-[#ddd0c8] rounded-lg bg-white shadow-sm flex justify-between items-start"
            >
              <div>
                <p className="font-medium text-[#2d2d2d]">{ticket.type}</p>
                <p className="text-sm text-[#555]">Prezzo: €{ticket.price}</p>
                <p className="text-sm text-[#555]">Disponibili: {ticket.availability}</p>
              </div>
              <button
                className="bg-white border border-black text-black px-3 py-1 rounded hover:bg-black hover:text-white"
                onClick={() => onAddToCart(ticket)}
              >
                +
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }