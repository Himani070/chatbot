# 🏁 GridBot AI — F1 Chatbot

A Formula 1 intelligent chatbot built with **Next.js**, **OpenAI**, and **DataStax Astra DB**. Ask anything about drivers, teams, circuits, records, and the latest F1 news.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| AI SDK | Vercel AI SDK (`ai`, `@ai-sdk/react`) |
| LLM | OpenAI (GPT-4o) |
| Vector DB | DataStax Astra DB |
| Styling | Custom CSS (Rajdhani + Inter fonts) |
| Language | TypeScript |

---

## Project Structure

```
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── global.css
│
├── app/components/
│   ├── Bubble.tsx
│   ├── LoadingBubble.tsx
│   └── PromptSuggestionsRow.tsx
│
├── app/api/chat/
│   └── route.ts
│
├── scripts/
│   └── loadDb.ts
│
├── .env
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Himani070/chatbot.git
cd GridBot-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root and fill in your credentials:

```env
ASTRA_DB_NAMESPACE=
ASTRA_DB_COLLECTION=
ASTRA_DB_API_ENDPOINT=
ASTRA_DB_APPLICATION_TOKEN=
OPENAI_API_KEY=
```

### 4. Seed the database

```bash
npx ts-node scripts/loadDb.ts
```

### 5. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `ASTRA_DB_NAMESPACE` | Keyspace in your Astra DB | Astra DB dashboard → Keyspaces |
| `ASTRA_DB_COLLECTION` | Vector collection name e.g. `f1_data` | Created automatically on first seed |
| `ASTRA_DB_API_ENDPOINT` | Astra DB REST API endpoint URL | Astra DB dashboard → Connect |
| `ASTRA_DB_APPLICATION_TOKEN` | Auth token for Astra DB | Astra DB dashboard → Generate Token |
| `OPENAI_API_KEY` | Your OpenAI API key | platform.openai.com/api-keys |

Never commit your `.env` file — it should be in `.gitignore`.

---

## How It Works

GridBot AI uses a RAG (Retrieval-Augmented Generation) architecture:

1. User submits a question
2. Question is embedded using OpenAI
3. Astra DB is queried for relevant F1 context via vector similarity search
4. Context + question are sent to GPT-4o
5. Response is streamed back to the UI

---

## Components

**Bubble.tsx** — Renders a single chat message with avatar, content, and timestamp. Supports `UIMessage` from the Vercel AI SDK.

**LoadingBubble.tsx** — Animated three-dot loader inside an AI bubble while a response streams in.

**PromptSuggestionsRow.tsx** — Welcome screen shown when the chat is empty, with clickable suggestion chips.

---

## Styling

All styles live in `app/global.css`. To retheme, edit the `:root` block:

```css
:root {
  --red:          #E10600;
  --surface:      #0E0E0E;
  --text:         #F5F5F5;
  --font-display: 'Rajdhani', sans-serif;
  --font-body:    'Inter', sans-serif;
}
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |

---

## Deployment

### Vercel (recommended)

1. Push your repo to GitHub
2. Import the project on vercel.com
3. Add all five environment variables under Settings → Environment Variables
4. Deploy

---

## License

MIT