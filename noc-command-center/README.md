# NOC Command Center - Laboratório 7

Projeto modular em React + TypeScript + Tailwind CSS, com componentes reutilizáveis, Custom Hook para as regras de conectividade e logs de observabilidade simulada.

## Requisitos
- Node.js instalado
- npm instalado

## Instalação
No terminal, dentro desta pasta:

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

Abra a URL exibida pelo Vite, normalmente:

```text
http://localhost:5173
```

## Validar a entrega

```bash
npm run build
```

## Funcionalidades do Lab 7

- React + TypeScript com Vite
- Tailwind CSS 4
- StatusCard
- TelemetryChart
- ConnectivityLink
- FleetTable
- Custom Hook `useFleetMonitor`
- 5 links de comunicação
- Regra de falha em cascata: VSAT offline -> Carro e SUV offline
- Log de Distributed Tracing simulado com `[OTel] TraceID`
- Interface responsiva

## Git / GitHub

```bash
git init
git add .
git commit -m "feat: noc command center modular v1.0"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/noc-command-center.git
git push -u origin main
```

## Vercel

1. Crie o repositório no GitHub e faça o push.
2. Na Vercel, importe o repositório.
3. Use o comando de build `npm run build`.
4. O diretório de saída é `dist`.
5. Variáveis do Vite, quando necessárias, devem usar o prefixo `VITE_` e ser acessadas com `import.meta.env.VITE_NOME_DA_VARIAVEL`.

Exemplo de variáveis:

```text
VITE_API_URL=
VITE_OTEL_EXPORTER_URL=
```

Não coloque segredos diretamente no código ou no repositório.
