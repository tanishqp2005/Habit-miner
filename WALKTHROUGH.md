# Walkthrough: Behavioral Habit Pattern Miner

## 1. Project Overview
The **Behavioral Habit Pattern Miner** is a high-performance analytical tool that helps users identify productivity patterns and optimize their schedules. It uses **Gemini Pro** for sequential pattern mining and **Supabase** for secure data storage.

## 2. Technical Stack
- **Frontend**: React 18, Vite, Lucide React, Recharts.
- **Styling**: Vanilla CSS with a custom Glassmorphic Design System.
- **Backend**: Supabase (Postgres, Auth, Edge Functions).
- **AI**: Google Gemini API (via Edge Functions).

## 3. Key Features
### A. High-End Glassmorphic Dashboard
A visually stunning interface with a radial gradient background, blurred translucent cards, and smooth transitions.
- **Energy Distribution Chart**: Visualizes energy levels over 24 hours.
- **Top Activities**: Categorizes daily activities by frequency.

### B. Activity Ingestor
Allows users to log activities with:
- **Duration**: Tracking time spent.
- **Energy Levels**: Behavioral tagging on a scale of 1-10.
- **Contextual Timestamps**: Pinpointing precisely when activities occurred.

### C. Gemini-Powered "Brain"
The application uses a Supabase Edge Function to securely call the Gemini API. It processes up to 30 days of data to:
1. Identify "Productivity Killers".
2. Pinpoint "High-Output Windows".
3. Generate a "Restructured Master Schedule".

## 4. Implementation Details

### Database Schema (`supabase/migrations`)
```sql
create table public.logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  timestamp timestamptz not null default now(),
  activity_name text not null,
  duration integer not null,
  energy_level integer check (energy_level >= 1 and energy_level <= 10)
);
```

### AI Logic (`supabase/functions/analyze-habits/index.ts`)
The Edge Function constructs a sophisticated prompt for Gemini Pro, treating the activity logs as a sequential dataset for pattern recognition.

### UI Components
- `Dashboard.tsx`: Uses `ResponsiveContainer` and `AreaChart` for fluid visualizations.
- `InsightCard.tsx`: Displays the AI's schedule recommendations in a structured table.

## 5. Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Configure `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Set up Supabase secrets:
   - `supabase secrets set GEMINI_API_KEY=your_key`
5. Start development: `npm run dev`.

## 6. Verification
- **Desktop (1440px)**: Verified glassmorphic layout and chart responsiveness.
- **Mobile (375px)**: Verified stackable grid and mobile-friendly inputs.
- **Logic**: Verified that missing Supabase keys are handled gracefully without crashing the UI.

---
Built by Antigravity - Lead Full-Stack Agent & Behavioral Scientist.
