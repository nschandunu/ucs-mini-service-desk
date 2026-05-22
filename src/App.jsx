

import { useState, useEffect } from 'react';
import TicketForm from './components/TicketForm';
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';


function App() {
  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem('ucs_tickets');
    return savedTickets ? JSON.parse(savedTickets) : [];
  });


  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');


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

  // Derived filtered tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Update status handler
  const handleUpdateStatus = (ticketId, newStatus) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updatedTickets);
    // Update the currently viewed ticket so the modal reflects the change immediately
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  };

  // Add note handler
  const handleAddNote = (ticketId, noteText) => {
    const newNote = {
      id: crypto.randomUUID(),
      text: noteText,
      timestamp: new Date().toISOString()
    };
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          notes: [...(ticket.notes || []), newNote]
        };
      }
      return ticket;
    });
    setTickets(updatedTickets);
    // Update the modal's state
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => ({
        ...prev,
        notes: [...(prev.notes || []), newNote]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-mono">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b-2 border-white pb-6">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">UCS Service Desk</h1>
            <p className="text-sm text-gray-400 mt-1">System Tickets & Tracking</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-white text-black px-4 py-2 font-bold hover:bg-gray-300 transition-colors uppercase text-sm border-2 border-transparent focus:border-gray-500"
          >
            + New Ticket
          </button>
        </header>

        {/* Dashboard Counters */}
        <Dashboard tickets={tickets} />

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 border border-white/20 p-4">
          <input 
            type="text" 
            placeholder="Search tickets..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-black border border-white/30 p-2 text-sm text-white focus:border-white focus:outline-none placeholder-gray-500"
          />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-black border border-white/30 p-2 text-sm text-white focus:border-white focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-black border border-white/30 p-2 text-sm text-white focus:border-white focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Ticket List */}
        <TicketList 
          tickets={filteredTickets} 
          onViewTicket={(ticket) => setSelectedTicket(ticket)} 
        />

      </div>

      {/* Conditionally render the modal overlay */}
      {isFormOpen && (
        <TicketForm 
          onSubmit={handleAddTicket} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}

      {selectedTicket && (
        <TicketDetails 
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdateStatus={handleUpdateStatus}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
}

export default App;
