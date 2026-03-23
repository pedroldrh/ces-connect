-- Run this in your Supabase SQL Editor

-- Profiles table (auto-populated on sign up)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Profiles are viewable by authenticated users"
  on profiles for select
  to authenticated
  using (true);

create policy "Users can update own profile"
  on profiles for update
  to authenticated
  using (auth.uid() = id);

-- Auto-create profile on sign up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Contacts table
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  grad_year int,
  company text,
  role text,
  industry text,
  how_they_help text,
  tags text[],
  added_by uuid references profiles(id) on delete cascade not null,
  created_at timestamptz default now()
);

alter table contacts enable row level security;

create policy "Contacts are viewable by authenticated users"
  on contacts for select
  to authenticated
  using (true);

create policy "Users can insert contacts"
  on contacts for insert
  to authenticated
  with check (auth.uid() = added_by);

create policy "Users can delete own contacts"
  on contacts for delete
  to authenticated
  using (auth.uid() = added_by);

-- Intro requests table
create table intro_requests (
  id uuid default gen_random_uuid() primary key,
  requester_id uuid references profiles(id) on delete cascade not null,
  contact_id uuid references contacts(id) on delete cascade not null,
  message text not null,
  status text default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz default now()
);

alter table intro_requests enable row level security;

create policy "Requesters can view own requests"
  on intro_requests for select
  to authenticated
  using (auth.uid() = requester_id);

create policy "Contact owners can view requests for their contacts"
  on intro_requests for select
  to authenticated
  using (
    contact_id in (
      select id from contacts where added_by = auth.uid()
    )
  );

create policy "Authenticated users can create requests"
  on intro_requests for insert
  to authenticated
  with check (auth.uid() = requester_id);

create policy "Contact owners can update request status"
  on intro_requests for update
  to authenticated
  using (
    contact_id in (
      select id from contacts where added_by = auth.uid()
    )
  );
