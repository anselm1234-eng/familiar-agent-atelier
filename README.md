# Familiar — Agent Atelier

> A visual, local-first atelier for designing, simulating, and exporting the blueprint of your personal AI agent.

**Created and maintained by Anselm Wrenna.**

## 🌟 What is this?
Every other agent tool starts with code. **Familiar** starts with a creature. It is a workshop where you grow a digital familiar—a personal AI agent—from a genome, a skill tree, and a blueprint canvas, then walk it through a simulated day before you ever write a line of code.

## ✨ Key Features
- **The Genome**: Define your agent's personality (Tone, Autonomy, Risk) with a live-updating fingerprint.
- **Blueprint Canvas**: A fully interactive node-graph editor. Drag, drop, connect triggers, tools, and guardrails. Includes a minimap and auto-layout.
- **Day Simulator**: Scrub through a 24-hour timeline to see how your agent handles a "boring Tuesday" and inject failure scenarios.
- **Guardrails Studio**: Set budget caps, human-in-the-loop checkpoints, and calculate your safety coverage score.
- **Persona Studio**: Watch your system prompt assemble itself in real-time based on your genome and guardrails.
- **Framework Translator**: Export your visual blueprint into LangChain, CrewAI, AutoGen, OpenAI Assistants, MCP, n8n, and Mermaid.js.
- **Progressive Web App (PWA)**: Fully installable, offline-first, with a beautiful deep-dark glassmorphic UI.

## 🛠 Tech Stack
- **Framework**: Vanilla TypeScript + Vite
- **Styling**: Pure CSS (Custom Design System, Glassmorphism, CSS Variables)
- **Database**: IndexedDB (Local-first, no backend required)
- **Audio**: Web Audio API (Synthesized UI sounds, no audio files)
- **PWA**: Vite Plugin PWA (Service Worker + Manifest)

## 🚀 Getting Started

1. Clone the repository:
   git clone https://github.com/yourusername/familiar-agent-atelier.git
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
4. Build for production:
   npm run build

## 📄 License
This project is open-source and available under the MIT License.