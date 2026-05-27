create table if not exists firearms (
  id text primary key,
  name text not null,
  category text not null,
  description text not null,
  caliber text not null,
  barrel_length text not null,
  weight text not null,
  magazine_capacity integer not null,
  muzzle_velocity text not null,
  origin text not null,
  manufacturer text not null,
  year integer not null,
  type text not null,
  action text not null,
  safeties text not null,
  sight text not null,
  color text not null
);

create index if not exists firearms_category_year_name_idx
  on firearms (category, year, name);
