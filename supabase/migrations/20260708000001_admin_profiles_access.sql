create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  nickname text not null default '',
  avatar_url text not null default '',
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_valid check (role in ('user', 'admin'))
);

create index if not exists profiles_role_idx on public.profiles (role);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, nickname, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'nickname', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', ''),
    coalesce(new.raw_user_meta_data ->> 'role', 'user')
  )
  on conflict (id) do update
  set email = excluded.email,
      nickname = excluded.nickname,
      avatar_url = excluded.avatar_url,
      role = excluded.role;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user_profile();

insert into public.profiles (id, email, nickname, avatar_url, role)
select
  id,
  email,
  coalesce(raw_user_meta_data ->> 'nickname', ''),
  coalesce(raw_user_meta_data ->> 'avatar_url', ''),
  coalesce(raw_user_meta_data ->> 'role', 'user')
from auth.users
on conflict (id) do update
set email = excluded.email,
    nickname = excluded.nickname,
    avatar_url = excluded.avatar_url,
    role = excluded.role;

create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  return exists (
    select 1
    from public.profiles profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
  or coalesce(auth.jwt() ->> 'role', '') = 'admin'
  or coalesce(auth.jwt() ->> 'user_role', '') = 'admin'
  or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
  or coalesce(auth.jwt() -> 'user_metadata' ->> 'role', '') = 'admin';
end;
$$;

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (id = auth.uid() or public.is_admin());

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

drop policy if exists "Users can delete their own profile" on public.profiles;
create policy "Users can delete their own profile"
on public.profiles
for delete
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "Admins can read all game sessions" on public.game_sessions;
create policy "Admins can read all game sessions"
on public.game_sessions
for select
to authenticated
using (public.is_admin() or user_id = auth.uid());

drop policy if exists "Admins can manage game sessions" on public.game_sessions;
create policy "Admins can manage game sessions"
on public.game_sessions
for insert
to authenticated
with check (public.is_admin() or user_id = auth.uid());

drop policy if exists "Admins can update game sessions" on public.game_sessions;
create policy "Admins can update game sessions"
on public.game_sessions
for update
to authenticated
using (public.is_admin() or user_id = auth.uid())
with check (public.is_admin() or user_id = auth.uid());

drop policy if exists "Admins can delete game sessions" on public.game_sessions;
create policy "Admins can delete game sessions"
on public.game_sessions
for delete
to authenticated
using (public.is_admin() or user_id = auth.uid());

drop policy if exists "Admins can read game progress" on public.game_progress;
create policy "Admins can read game progress"
on public.game_progress
for select
to authenticated
using (
  public.is_admin()
  or auth.uid() = (
    select user_id
    from public.game_sessions
    where id = game_session_id
  )
);

drop policy if exists "Admins can manage game progress" on public.game_progress;
create policy "Admins can manage game progress"
on public.game_progress
for insert
to authenticated
with check (
  public.is_admin()
  or auth.uid() = (
    select user_id
    from public.game_sessions
    where id = game_session_id
  )
);

drop policy if exists "Admins can delete game progress" on public.game_progress;
create policy "Admins can delete game progress"
on public.game_progress
for delete
to authenticated
using (
  public.is_admin()
  or auth.uid() = (
    select user_id
    from public.game_sessions
    where id = game_session_id
  )
);

drop policy if exists "Admins can read lifelines used" on public.lifelines_used;
create policy "Admins can read lifelines used"
on public.lifelines_used
for select
to authenticated
using (
  public.is_admin()
  or auth.uid() = (
    select user_id
    from public.game_sessions
    where id = game_session_id
  )
);

drop policy if exists "Admins can manage lifelines used" on public.lifelines_used;
create policy "Admins can manage lifelines used"
on public.lifelines_used
for insert
to authenticated
with check (
  public.is_admin()
  or auth.uid() = (
    select user_id
    from public.game_sessions
    where id = game_session_id
  )
);

drop policy if exists "Admins can delete lifelines used" on public.lifelines_used;
create policy "Admins can delete lifelines used"
on public.lifelines_used
for delete
to authenticated
using (
  public.is_admin()
  or auth.uid() = (
    select user_id
    from public.game_sessions
    where id = game_session_id
  )
);

drop policy if exists "Admins can read high scores" on public.high_scores;
create policy "Admins can read high scores"
on public.high_scores
for select
to authenticated
using (public.is_admin() or user_id = auth.uid() or true);

drop policy if exists "Admins can manage high scores" on public.high_scores;
create policy "Admins can manage high scores"
on public.high_scores
for insert
to authenticated
with check (public.is_admin() or user_id = auth.uid());

drop policy if exists "Admins can delete high scores" on public.high_scores;
create policy "Admins can delete high scores"
on public.high_scores
for delete
to authenticated
using (public.is_admin() or user_id = auth.uid());

drop policy if exists "Admins can manage difficulty levels" on public.difficulty_levels;
create policy "Admins can manage difficulty levels"
on public.difficulty_levels
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update difficulty levels" on public.difficulty_levels;
create policy "Admins can update difficulty levels"
on public.difficulty_levels
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete difficulty levels" on public.difficulty_levels;
create policy "Admins can delete difficulty levels"
on public.difficulty_levels
for delete
to authenticated
using (public.is_admin());

drop policy if exists "Admins can manage lifelines" on public.lifelines;
create policy "Admins can manage lifelines"
on public.lifelines
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update lifelines" on public.lifelines;
create policy "Admins can update lifelines"
on public.lifelines
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete lifelines" on public.lifelines;
create policy "Admins can delete lifelines"
on public.lifelines
for delete
to authenticated
using (public.is_admin());

drop policy if exists "Admins can read users" on public.users;
create policy "Admins can read users"
on public.users
for select
to authenticated
using (public.is_admin() or auth.uid() = id);

drop policy if exists "Admins can manage users" on public.users;
create policy "Admins can manage users"
on public.users
for insert
to authenticated
with check (public.is_admin() or auth.uid() = id);

drop policy if exists "Admins can update users" on public.users;
create policy "Admins can update users"
on public.users
for update
to authenticated
using (public.is_admin() or auth.uid() = id)
with check (public.is_admin() or auth.uid() = id);

drop policy if exists "Admins can delete users" on public.users;
create policy "Admins can delete users"
on public.users
for delete
to authenticated
using (public.is_admin() or auth.uid() = id);

drop policy if exists "Admins can read difficulty levels" on public.difficulty_levels;
create policy "Admins can read difficulty levels"
on public.difficulty_levels
for select
to authenticated
using (true);

drop policy if exists "Admins can manage difficulty levels" on public.difficulty_levels;
create policy "Admins can manage difficulty levels"
on public.difficulty_levels
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update difficulty levels" on public.difficulty_levels;
create policy "Admins can update difficulty levels"
on public.difficulty_levels
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete difficulty levels" on public.difficulty_levels;
create policy "Admins can delete difficulty levels"
on public.difficulty_levels
for delete
to authenticated
using (public.is_admin());

drop policy if exists "Admins can read questions" on public.questions;
create policy "Admins can read questions"
on public.questions
for select
to authenticated
using (true);

drop policy if exists "Admins can manage questions" on public.questions;
create policy "Admins can manage questions"
on public.questions
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update questions" on public.questions;
create policy "Admins can update questions"
on public.questions
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete questions" on public.questions;
create policy "Admins can delete questions"
on public.questions
for delete
to authenticated
using (public.is_admin());

drop policy if exists "Admins can read answers" on public.answers;
create policy "Admins can read answers"
on public.answers
for select
to authenticated
using (true);

drop policy if exists "Admins can manage answers" on public.answers;
create policy "Admins can manage answers"
on public.answers
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update answers" on public.answers;
create policy "Admins can update answers"
on public.answers
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete answers" on public.answers;
create policy "Admins can delete answers"
on public.answers
for delete
to authenticated
using (public.is_admin());
