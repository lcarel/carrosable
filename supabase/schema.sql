-- ============================================================
-- Carrossable – Schéma Supabase
-- À coller dans : Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- Table des avis
create table if not exists reviews (
  id          uuid primary key default gen_random_uuid(),
  trail_id    text not null,
  author      text not null,
  rating      int  not null check (rating between 1 and 5),
  comment     text not null,
  stroller_type text,
  created_at  timestamptz default now()
);

-- Table des votes (1 vote par session et par balade)
create table if not exists votes (
  trail_id    text not null,
  session_id  text not null,
  value       int  not null check (value in (1, -1)),
  primary key (trail_id, session_id)
);

-- Index pour accélérer les requêtes par balade
create index if not exists reviews_trail_id_idx on reviews (trail_id);
create index if not exists votes_trail_id_idx   on votes   (trail_id);

-- Table des propositions de balades
create table if not exists proposals (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  location      text not null,
  region        text not null,
  description   text not null,
  distance      numeric not null,
  elevation     numeric not null,
  duration      text not null,
  stroller_level int not null check (stroller_level between 1 and 3),
  tags          text,
  image_url     text,
  lat           numeric not null,
  lng           numeric not null,
  submitter_name text,
  submitter_email text,
  status        text not null default 'pending',
  created_at    timestamptz default now()
);

create index if not exists proposals_status_idx on proposals (status);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

alter table reviews enable row level security;
alter table votes   enable row level security;

-- Tout le monde peut lire les avis et les votes
create policy "Lecture publique des avis"  on reviews for select using (true);
create policy "Lecture publique des votes" on votes   for select using (true);

-- Tout le monde peut poster un avis
create policy "Insertion publique des avis" on reviews for insert with check (true);

-- Tout le monde peut voter / changer son vote / annuler
create policy "Insertion publique des votes"    on votes for insert with check (true);
create policy "Mise à jour publique des votes"  on votes for update using (true);
create policy "Suppression publique des votes"  on votes for delete using (true);

alter table proposals enable row level security;

-- Tout le monde peut soumettre une proposition
create policy "Insertion publique des propositions" on proposals for insert with check (true);
