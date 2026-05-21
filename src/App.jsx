

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
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
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

        {/* Dashboard Counters */}
        <Dashboard tickets={tickets} />

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <input 
            type="text" 
            placeholder="Search tickets..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
          />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-black focus:outline-none bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-black focus:outline-none bg-white"
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
