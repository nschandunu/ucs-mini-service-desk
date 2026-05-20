function Dashboard({ tickets }) {
  const total = tickets.length;
  const open = tickets.filter(t => t.status === 'Open').length;
  const inProgress = tickets.filter(t => t.status === 'In Progress').length;
  const closed = tickets.filter(t => t.status === 'Closed').length;

  const StatCard = ({ label, count, colorClass }) => (
    <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-center">
      <span className="text-sm font-medium text-gray-500 mb-1">{label}</span>
      <span className={`text-3xl font-bold ${colorClass}`}>{count}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Total Tickets" count={total} colorClass="text-gray-900" />
      <StatCard label="Open" count={open} colorClass="text-blue-600" />
      <StatCard label="In Progress" count={inProgress} colorClass="text-amber-500" />
      <StatCard label="Closed" count={closed} colorClass="text-gray-400" />
    </div>
  );
}

export default Dashboard;
