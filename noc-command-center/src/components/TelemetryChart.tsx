import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface TelemetryData {
  time: string;
  speed: number;
}

interface TelemetryChartProps {
  data: TelemetryData[];
}

export const TelemetryChart = ({ data }: TelemetryChartProps) => (
  <div className="rounded-2xl border border-slate-800 bg-noc-card p-6 shadow-lg shadow-black/10">
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-white">Velocidade Média da Frota</h2>
      <p className="mt-1 text-xs text-slate-500">Telemetria simulada</p>
    </div>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '12px',
              color: '#fff',
            }}
          />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
