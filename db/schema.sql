create table if not exists app_store (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);