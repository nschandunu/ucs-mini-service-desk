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
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{ticket.title}</h2>
            <p className="text-xs text-gray-500">Reported by {ticket.reporter} on {new Date(ticket.createdAt).toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">
            &times;
          </button>
        </div>
        {/* Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Metadata & Status */}
          <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div>
              <span className="text-xs text-gray-500 block mb-1">Priority</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1">Category</span>
              <span className="text-sm font-medium text-gray-800">{ticket.category}</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <select
                value={ticket.status}
                onChange={handleStatusChange}
                className="border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-black outline-none bg-white font-medium"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
            <div className="bg-white border border-gray-100 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
              {ticket.description}
            </div>
          </div>
          {/* Notes Section */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Internal Notes ({ticket.notes?.length || 0})</h3>
            <div className="space-y-3 mb-4">
              {ticket.notes && ticket.notes.length > 0 ? (
                ticket.notes.map((note) => (
                  <div key={note.id} className="bg-blue-50/50 border border-blue-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-800">{note.text}</p>
                    <span className="text-xs text-gray-400 mt-2 block">
                      {new Date(note.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No notes added yet.</p>
              )}
            </div>
            <form onSubmit={submitNote} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Type a note..."
                className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-black outline-none"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
