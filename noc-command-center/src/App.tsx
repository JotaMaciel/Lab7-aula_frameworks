import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Car,
  Radio,
  Server,
} from 'lucide-react';
import { StatusCard } from './components/StatusCard';
import { TelemetryChart } from './components/TelemetryChart';
import { ConnectivityLink } from './components/ConnectivityLink';
import { FleetTable } from './components/FleetTable';
import { useFleetMonitor, type LinkId } from './hooks/useFleetMonitor';

interface Vehicle {
  id: string;
  modelo: string;
  tipo: string;
  vel: number;
}

const vehicleSeed: Omit<Vehicle, 'id'>[] = [
  { modelo: '🚌', tipo: 'Ônibus', vel: 85 },
  { modelo: '🚚', tipo: 'Caminhão', vel: 70 },
  { modelo: '🏍️', tipo: 'Moto', vel: 110 },
  { modelo: '🚗', tipo: 'Carro', vel: 110 },
  { modelo: '🛻', tipo: 'Caminhonete', vel: 80 },
  { modelo: '🚐', tipo: 'Van', vel: 75 },
  { modelo: '🚙', tipo: 'SUV', vel: 100 },
  { modelo: '🏎️', tipo: 'Esportivo', vel: 140 },
  { modelo: '🚜', tipo: 'Trator', vel: 30 },
  { modelo: '🚑', tipo: 'Ambulância', vel: 120 },
];

const createFleet = (count: number): Vehicle[] =>
  Array.from({ length: count }, (_, index) => {
    const seed = vehicleSeed[index % vehicleSeed.length];
    return {
      id: `V-${String(index + 1).padStart(6, '0')}`,
      ...seed,
    };
  });

const fleetData = createFleet(100_000);

const communicationLinks: Array<{
  id: LinkId;
  name: string;
  type: string;
  latency: string;
}> = [
  { id: 'vsat', name: 'VSAT Principal', type: 'Satélite Star One D2', latency: '580ms' },
  { id: 'vsat-bgan', name: 'VSAT BGAN', type: 'Satélite Inmarsat', latency: '850ms' },
  { id: 'ospf', name: 'OSPF', type: 'Core Interno', latency: '2ms' },
  { id: 'bgp', name: 'BGP', type: 'Operadora AS-1042', latency: '12ms' },
  { id: 'lte', name: 'LTE', type: 'Antena Celular', latency: '45ms' },
];

const telemetryData = [
  { time: '12:00', speed: 72 },
  { time: '12:05', speed: 78 },
  { time: '12:10', speed: 81 },
  { time: '12:15', speed: 76 },
  { time: '12:20', speed: 85 },
  { time: '12:25', speed: 89 },
  { time: '12:30', speed: 84 },
];

function App() {
  const { linksStatus, toggleLink, isCategoryOnline } = useFleetMonitor();
  const [metrics, setMetrics] = useState({ uptime: '99.98%', alerts: 0 });

  const offlineVehicles = useMemo(
    () => fleetData.filter((vehicle) => !isCategoryOnline(vehicle.tipo)),
    [isCategoryOnline],
  );

  useEffect(() => {
    setMetrics((current) => ({
      ...current,
      alerts: offlineVehicles.length,
    }));
  }, [offlineVehicles.length]);

  useEffect(() => {
    const traceId = Math.random().toString(16).slice(2);
    console.log(`[OTel] TraceID: ${traceId} - Atualizando telemetria da frota...`);
  }, [metrics]);

  const onlineLinks = Object.values(linksStatus).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-noc-bg text-white">
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-3">
                <Radio size={28} className="text-noc-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">NOC Command Center</h1>
                <p className="text-sm text-slate-500">Monitoramento modular da frota</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">SISTEMA OPERACIONAL</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <StatusCard
            label="Uptime"
            value={metrics.uptime}
            subtext="Disponibilidade da infraestrutura"
            icon={Activity}
            variant="success"
          />
          <StatusCard
            label="Veículos"
            value="100.000"
            subtext="Frota monitorada"
            icon={Car}
            variant="success"
          />
          <StatusCard
            label="Alertas"
            value={metrics.alerts}
            subtext="Veículos afetados"
            icon={AlertTriangle}
            variant={metrics.alerts > 0 ? 'warning' : 'success'}
          />
        </section>

        <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TelemetryChart data={telemetryData} />

          <div className="rounded-2xl border border-slate-800 bg-noc-card p-6 shadow-lg shadow-black/10">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Conectividade</h2>
                <p className="mt-1 text-xs text-slate-500">
                  {onlineLinks}/{communicationLinks.length} links online
                </p>
              </div>
              <Server size={22} className="text-noc-accent" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {communicationLinks.map((link) => (
                <ConnectivityLink
                  key={link.id}
                  id={link.id}
                  name={link.name}
                  type={link.type}
                  latency={link.latency}
                  online={linksStatus[link.id]}
                  onToggle={toggleLink}
                />
              ))}
            </div>
          </div>
        </section>

        {!linksStatus.vsat && (
          <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="shrink-0 text-red-500" size={22} />
              <div>
                <p className="font-semibold text-red-400">Falha no VSAT detectada</p>
                <p className="text-sm text-red-300/70">
                  Carros e SUVs estão offline devido à regra de dependência da rede.
                </p>
              </div>
            </div>
          </div>
        )}

        <FleetTable vehicles={fleetData} isCategoryOnline={isCategoryOnline} />
      </main>
    </div>
  );
}

export default App;
