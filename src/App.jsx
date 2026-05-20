import { useState, useEffect } from 'react';
import TicketForm from './components/TicketForm';


function App() {
  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem('ucs_tickets');
    return savedTickets ? JSON.parse(savedTickets) : [];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ucs_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleAddTicket = (newTicket) => {
    const ticketWithMeta = {
      ...newTicket,
      id: crypto.randomUUID(),
      status: 'Open',
      createdAt: new Date().toISOString(),
      notes: []
    };
    setTickets([ticketWithMeta, ...tickets]);
    setIsFormOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800 p-6 font-sans">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Section */}
          <header className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">UCS Service Desk</h1>
              <p className="text-sm text-gray-500">Manage support tickets efficiently</p>
            </div>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              + New Ticket
            </button>
          </header>

          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500 italic">Dashboard Counters will go here...</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500 italic">Ticket List and Filters will go here... (Total tickets: {tickets.length})</p>
          </div>

        </div>
      </div>

      {isFormOpen && (
        <TicketForm 
          onSubmit={handleAddTicket} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}
    </>
  );
}

export default App;
