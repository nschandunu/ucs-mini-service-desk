import { useState } from 'react';

function TicketDetails({ ticket, onClose, onUpdateStatus, onAddNote }) {
  const [newNote, setNewNote] = useState('');

  if (!ticket) return null;

  const handleStatusChange = (e) => {
    onUpdateStatus(ticket.id, e.target.value);
  };

  const submitNote = (e) => {
    e.preventDefault();
    if (newNote.trim() === '') return;
    onAddNote(ticket.id, newNote);
    setNewNote('');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700';
      case 'Medium': return 'bg-orange-50 text-orange-700';
      case 'Low': return 'bg-blue-50 text-blue-700';
      default: return 'bg-zinc-50 text-zinc-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 font-mono">
      <div className="bg-black border border-white w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white flex justify-between items-center text-white shrink-0">
          <div>
            <h2 className="text-lg font-bold uppercase tracking-tight">{ticket.title}</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase">ID: {ticket.id.slice(0,8)} | By: {ticket.reporter}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-400 font-bold px-2">
            [x]
          </button>
        </div>
        {/* Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-white text-sm">
          {/* Metadata & Status */}
          <div className="grid grid-cols-3 gap-4 border border-white/20 p-4">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Priority</span>
              <span className="text-white border border-white/40 px-2.5 py-1 text-xs">{ticket.priority}</span>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Category</span>
              <span className="text-white font-medium">{ticket.category}</span>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Status</span>
              <select
                value={ticket.status}
                onChange={handleStatusChange}
                className="bg-black border border-white/40 text-white p-1.5 text-xs focus:border-white focus:outline-none appearance-none"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Description</h3>
            <div className="border border-white/20 p-4 whitespace-pre-wrap leading-relaxed">
              {ticket.description}
            </div>
          </div>
          {/* Notes Section */}
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-4">Activity Log ({ticket.notes?.length || 0})</h3>
            <div className="space-y-4 mb-6">
              {ticket.notes && ticket.notes.length > 0 ? (
                ticket.notes.map((note) => (
                  <div key={note.id} className="border-l-2 border-white pl-4 py-1">
                    <p className="text-white leading-relaxed">{note.text}</p>
                    <span className="text-xs text-gray-500 mt-2 block font-mono">
                      &gt; {new Date(note.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No activity logged.</p>
              )}
            </div>
            <form onSubmit={submitNote} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add to log..."
                className="flex-1 bg-black border border-white/40 p-2 text-sm text-white focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="px-6 py-2 bg-white text-black font-bold uppercase hover:bg-gray-300 disabled:opacity-50 disabled:bg-gray-700 disabled:text-gray-300"
              >
                Append
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
