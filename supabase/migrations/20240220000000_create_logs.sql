-- Create logs table
create table public.logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  timestamp timestamptz not null default now(),
  activity_name text not null,
  duration integer not null, -- duration in minutes
  energy_level integer check (energy_level >= 1 and energy_level <= 10),
  context text,
  created_at timestamptz default now()
);

-- Set up Row Level Security (RLS)
alter table public.logs enable row level security;

-- Create policies
create policy "Users can insert their own logs"
  on public.logs for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own logs"
  on public.logs for select
  using (auth.uid() = user_id);

create policy "Users can update their own logs"
  on public.logs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own logs"
  on public.logs for delete
  using (auth.uid() = user_id);
