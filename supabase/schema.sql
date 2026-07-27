-- ═══════════════════════════════════════════════════════════════
-- Portfolio schema — run once in the Supabase SQL Editor.
-- Safe to re-run: everything is IF NOT EXISTS / OR REPLACE.
-- ═══════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────
-- posts — the blog / journal feed
-- ───────────────────────────────────────────────────────────────
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  published_at  timestamptz not null default now(),

  -- A post is an image with a caption, or text only. At least one must exist.
  caption       text,
  image_url     text,
  image_width   int,
  image_height  int,

  -- Optional title; the feed falls back to the caption's first line.
  title         text,
  mood          text default 'productive',
  tags          text[] default '{}',

  slug          text unique not null,
  is_published  boolean not null default true,

  constraint posts_has_content check (
    coalesce(nullif(trim(caption), ''), image_url) is not null
  )
);

create index if not exists posts_published_idx
  on public.posts (is_published, published_at desc);

-- ───────────────────────────────────────────────────────────────
-- wall_messages — the public whisper wall
-- ───────────────────────────────────────────────────────────────
create table if not exists public.wall_messages (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  text          text not null check (char_length(trim(text)) between 1 and 280),
  name          text check (name is null or char_length(name) <= 30),
  is_anonymous  boolean not null default true,
  emoji         text default '💌' check (char_length(emoji) <= 8),

  -- Moderation. Visitors only ever see is_visible = true.
  is_visible    boolean not null default true
);

create index if not exists wall_messages_visible_idx
  on public.wall_messages (is_visible, created_at desc);

-- ═══════════════════════════════════════════════════════════════
-- Row Level Security
--
-- The anon key ships in the browser bundle, so it is public by
-- definition. RLS — not the key — is what actually protects the data.
-- ═══════════════════════════════════════════════════════════════

alter table public.posts enable row level security;
alter table public.wall_messages enable row level security;

-- ── posts ──────────────────────────────────────────────────────
-- Anyone may read published posts.
drop policy if exists "posts are publicly readable" on public.posts;
create policy "posts are publicly readable"
  on public.posts for select
  using (is_published = true);

-- Only a signed-in user (you) may write. There is no public sign-up:
-- disable it under Authentication → Providers → Email → "Allow new users
-- to sign up", so the only account is the one you create by hand.
drop policy if exists "authenticated users manage posts" on public.posts;
create policy "authenticated users manage posts"
  on public.posts for all
  to authenticated
  using (true)
  with check (true);

-- ── wall_messages ──────────────────────────────────────────────
-- Anyone may read visible messages.
drop policy if exists "visible messages are publicly readable" on public.wall_messages;
create policy "visible messages are publicly readable"
  on public.wall_messages for select
  using (is_visible = true);

-- Anyone may post, but only within the column constraints above, and
-- they cannot smuggle in a pre-hidden or pre-dated row.
drop policy if exists "anyone can leave a message" on public.wall_messages;
create policy "anyone can leave a message"
  on public.wall_messages for insert
  to anon, authenticated
  with check (is_visible = true);

-- Only you can hide or delete a message.
drop policy if exists "authenticated users moderate messages" on public.wall_messages;
create policy "authenticated users moderate messages"
  on public.wall_messages for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated users delete messages" on public.wall_messages;
create policy "authenticated users delete messages"
  on public.wall_messages for delete
  to authenticated
  using (true);
