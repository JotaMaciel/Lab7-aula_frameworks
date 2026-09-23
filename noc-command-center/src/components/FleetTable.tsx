interface Vehicle {
  id: string;
  modelo: string;
  tipo: string;
  vel: number;
}

interface FleetTableProps {
  vehicles: Vehicle[];
  isCategoryOnline: (category: string) => boolean;
}

export const FleetTable = ({ vehicles, isCategoryOnline }: FleetTableProps) => {
  const visibleVehicles = vehicles.slice(0, 25);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-noc-card shadow-lg shadow-black/10">
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Frota</h2>
            <p className="mt-1 text-xs text-slate-500">
              Exibindo {visibleVehicles.length} registros da frota monitorada
            </p>
          </div>
          <span className="text-xs text-slate-500">100.000 veículos</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px]">
          <thead className="bg-slate-950/70">
            <tr>
              {['ID', 'Modelo', 'Categoria', 'Velocidade', 'Status'].map((title) => (
                <th key={title} className="p-4 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleVehicles.map((vehicle) => {
              const online = isCategoryOnline(vehicle.tipo);

              return (
                <tr key={vehicle.id} className="border-t border-slate-800 transition hover:bg-slate-900/50">
                  <td className="p-4 text-sm font-semibold text-blue-400">{vehicle.id}</td>
                  <td className="p-4 text-sm text-2xl">{vehicle.modelo}</td>
                  <td className="p-4 text-sm text-slate-300">{vehicle.tipo}</td>
                  <td className="p-4 text-sm text-slate-300">
                    {online ? `${vehicle.vel} km/h` : '0 km/h'}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold ${online ? 'text-emerald-500' : 'text-red-500'}`}>
                      {online ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
