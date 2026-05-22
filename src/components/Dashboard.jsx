function Dashboard({ tickets }) {
  const total = tickets.length;
  const open = tickets.filter(t => t.status === 'Open').length;
  const inProgress = tickets.filter(t => t.status === 'In Progress').length;
  const closed = tickets.filter(t => t.status === 'Closed').length;

  const StatCard = ({ label, count }) => (
    <div className="border border-white/20 p-4 flex flex-col justify-center bg-black hover:border-white/50 transition-colors">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</span>
      <span className="text-3xl font-mono text-white">{count}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Total Tickets" count={total} />
      <StatCard label="Open" count={open} />
      <StatCard label="In Progress" count={inProgress} />
      <StatCard label="Closed" count={closed} />
    </div>
  );
}

export default Dashboard;
