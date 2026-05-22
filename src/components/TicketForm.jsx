import { useState } from 'react';

function TicketForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Software', // Default value
    priority: 'Low',      // Default value
    reporter: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 font-mono">
      <div className="bg-black w-full max-w-lg border border-white">
        
        <div className="px-6 py-4 border-b border-white flex justify-between items-center text-white">
          <h2 className="text-lg font-bold uppercase tracking-tight">Create Ticket</h2>
          <button onClick={onCancel} className="text-white hover:text-gray-400 font-bold px-2">
            [x]
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div>
            <label className="block text-sm font-bold text-white mb-2 uppercase">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/40 p-2.5 text-sm text-white focus:border-white focus:outline-none"
              placeholder="Brief summary..."
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-white mb-2 uppercase">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black border border-white/40 p-2.5 text-sm text-white focus:border-white focus:outline-none appearance-none"
              >
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="Network">Network</option>
                <option value="Access">Access/Login</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-2 uppercase">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-black border border-white/40 p-2.5 text-sm text-white focus:border-white focus:outline-none appearance-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2 uppercase">Reporter</label>
            <input
              type="text"
              name="reporter"
              value={formData.reporter}
              onChange={handleChange}
              required
              className="w-full bg-black border border-white/40 p-2.5 text-sm text-white focus:border-white focus:outline-none"
              placeholder="Name..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2 uppercase">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full bg-black border border-white/40 p-2.5 text-sm text-white focus:border-white focus:outline-none"
              placeholder="Detailed description..."
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-sm font-bold text-white border border-white/40 hover:bg-white/10 uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-bold text-black bg-white hover:bg-gray-300 uppercase"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default TicketForm;
