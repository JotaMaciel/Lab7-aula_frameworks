import type { LinkId } from '../hooks/useFleetMonitor';

interface ConnectivityLinkProps {
  id: LinkId;
  name: string;
  type: string;
  online: boolean;
  latency: string;
  onToggle: (id: LinkId) => void;
}

export const ConnectivityLink = ({
  id,
  name,
  type,
  online,
  latency,
  onToggle,
}: ConnectivityLinkProps) => (
  <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate font-semibold text-white">{name}</p>
        <p className="mt-1 truncate text-xs text-slate-500">{type}</p>
      </div>

      <span
        className={`h-3 w-3 shrink-0 rounded-full ${
          online ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30' : 'bg-red-500 shadow-lg shadow-red-500/30'
        }`}
        aria-label={online ? 'Link online' : 'Link offline'}
      />
    </div>

    <div className="mt-4 flex items-center justify-between">
      <span className={`text-xs font-semibold ${online ? 'text-emerald-500' : 'text-red-500'}`}>
        {online ? 'ONLINE' : 'OFFLINE'}
      </span>
      <span className="text-xs text-slate-400">{latency}</span>
    </div>

    <button
      type="button"
      onClick={() => onToggle(id)}
      className="mt-4 w-full rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {online ? 'Simular Falha' : 'Restabelecer Link'}
    </button>
  </div>
);
