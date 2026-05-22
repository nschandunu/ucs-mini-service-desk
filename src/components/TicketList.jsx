function TicketList({ tickets, onViewTicket }) {
  if (tickets.length === 0) {
    return (
      <div className="p-12 text-center border border-white/20 text-gray-500 font-mono text-sm">
        No tickets found in the system. Create one to get started!
      </div>
    );
  }

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return 'border-white text-white font-bold';
      case 'Medium': return 'border-gray-400 text-gray-300';
      case 'Low': return 'border-gray-600 text-gray-500';
      default: return 'border-gray-600 text-gray-500';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Open': return 'bg-white text-black font-bold';
      case 'In Progress': return 'border border-white text-white italic';
      case 'Closed': return 'text-gray-500 line-through';
      default: return 'text-white';
    }
  };

  return (
    <div className="border border-white/20 overflow-hidden bg-black font-mono">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20 text-xs text-gray-400 uppercase tracking-wider bg-white/5">
              <th className="px-6 py-4 font-normal">Ticket</th>
              <th className="px-6 py-4 font-normal">Category</th>
              <th className="px-6 py-4 font-normal">Priority</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {tickets.map((ticket) => (
              <tr 
                key={ticket.id} 
                onClick={() => onViewTicket(ticket)}
                className="border-b border-white/10 hover:bg-white/10 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-bold text-white">{ticket.title}</div>
                  <div className="text-xs text-gray-500 mt-1">By: {ticket.reporter}</div>
                </td>
                <td className="px-6 py-4 text-gray-300">{ticket.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs border ${getPriorityStyle(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs ${getStatusStyle(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketList;
