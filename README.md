# PromptForge — AI Content Studio

A responsive AI-assisted content workspace built with React and Vite. Users can create blog drafts, social captions, professional emails, LinkedIn posts and resume bullets. It includes editable prompts, tone and length controls, copy-to-clipboard, regeneration, loading and error states, and a demo preview mode.

## Features
- Five content templates
- Custom topic, audience, tone and length inputs
- Optional Google Gemini API integration
- Demo mode works without an API key
- Responsive layout for desktop and mobile
- Copy and regenerate actions

## Tech stack
- React
- Vite
- CSS (responsive custom styling)
- Lucide React icons
- Google Gemini API (optional)

## Run locally

1. Install Node.js (LTS).
2. Open this folder in a terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite.

## Enable live AI generation (optional)

1. Create a Gemini API key at <https://aistudio.google.com/app/apikey>.
2. Copy `.env.example` to `.env`.
3. Add your key:

   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Restart the dev server.

**Important:** This demo calls Gemini directly from the browser, so a `VITE_` key is exposed in the client bundle. Use this only for local demos or a throwaway restricted key. For production, route requests through a backend/serverless function and keep the API key in server-side environment variables. Never commit `.env`.

## Build for production

```bash
npm run build
npm run preview
```

## Push to GitHub

Create an empty repository on GitHub, then run these commands from this project folder:

```bash
git init
git add .
git commit -m "Build PromptForge AI content studio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ai-native-content-studio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Portfolio note

This is a starter portfolio project. Before presenting it as your own work, run it, test it, understand the React state and API flow, customize the design/content, and be ready to explain the implementation in an interview. Do not claim production usage unless you have actually deployed and operated it.
