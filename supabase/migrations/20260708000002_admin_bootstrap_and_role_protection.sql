create table if not exists public.admin_emails (
  email text primary key,
  created_at timestamptz not null default now()
);

insert into public.admin_emails (email)
values ('vader@abv.bg')
on conflict (email) do nothing;

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
  or exists (
    select 1
    from public.admin_emails admin_emails
    where admin_emails.email = coalesce(auth.jwt() ->> 'email', '')
  )
  or coalesce(auth.jwt() ->> 'role', '') = 'admin'
  or coalesce(auth.jwt() ->> 'user_role', '') = 'admin'
  or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
  or coalesce(auth.jwt() -> 'user_metadata' ->> 'role', '') = 'admin';
end;
$$;

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
    case
      when exists (
        select 1
        from public.admin_emails admin_emails
        where admin_emails.email = new.email
      ) then 'admin'
      else coalesce(new.raw_user_meta_data ->> 'role', 'user')
    end
  )
  on conflict (id) do update
  set email = excluded.email,
      nickname = excluded.nickname,
      avatar_url = excluded.avatar_url,
      role = excluded.role;

  return new;
end;
$$;

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    new.role := old.role;
    new.email := old.email;
  end if;

  return new;
end;
$$;

drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role
before update on public.profiles
for each row execute function public.protect_profile_role();

update public.profiles
set role = 'admin'
where email in (select email from public.admin_emails);
