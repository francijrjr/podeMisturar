# Pode Mestirurar - Documentação

## Requisitos
- Node.js 18+ e npm
- Windows PowerShell (ou terminal equivalente)

## Backend (API)
1. Instalar dependências:
```bash
cd backend
npm i
```
2. Rodar o servidor:
```bash
npm run start
```
- O servidor fica em `http://localhost:3001` (ou `PORT` informado).
- Endpoint: `GET /api/misturas/:entrada`
  - A `:entrada` é normalizada: minúsculas, sem espaços, com `+` entre termos, em ordem alfabética.
  - Exemplo: `alcool+vinagre`, `bicarbonato+vinagre`.
 - Saúde: `GET /health` retorna `{ status: "healthy" }`.
 - Raiz: `GET /` retorna `{ name: "pode-mestirurar-api", status: "ok" }`.

## Frontend (Vite + React + TS + Tailwind)
1. Instalar dependências:
```bash
cd frontend
npm i
```
2. Rodar em desenvolvimento:
```bash
npm run dev
```
- Acesse `http://localhost:5173`.
- O Vite está com proxy para `/api` → `http://localhost:3001`, então o front chama `/api/...` diretamente.

## Estrutura do Frontend
- `src/App.tsx`: componente raiz que renderiza `PodeMestirurar`.
- `src/PodeMestirurar.tsx`: lógica de formulário e chamada à API.
- `src/main.tsx`: bootstrap do React.
- `src/index.css`: Tailwind v4.
- `vite.config.ts`: plugins React e Tailwind e alias `@` para `src`.

## Fluxo de uso no Frontend
1. Digite duas substâncias separadas por `+` (ex.: `alcool+vinagre`).
2. Clique em "Verificar".
3. O resultado é buscado em `GET /api/misturas/:entrada` (via proxy) e exibido na tela.

## Respostas da API
- 200 OK
```json
{
  "descricao": "...",
  "efeito": "...",
  "risco": "...",
  "aplicacao": "...",
  "alerta": "..."
}
```
- 404 Not Found
```json
{ "error": "Mistura desconhecida. Evite testar sem pesquisar!" }
```

## Problemas comuns
- CORS/Conexão: backend deve estar em `http://localhost:3001`.
- 404: verifique normalização da entrada.
- Estilos não aplicam: confirme `@import "tailwindcss";` em `src/index.css` e plugin no `vite.config.ts`.

## Scripts úteis (frontend)
- `npm run dev`: desenvolvimento
- `npm run build`: build para produção
- `npm run preview`: preview do build (porta 4173)
