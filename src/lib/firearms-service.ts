import 'server-only';

import { pool, queryDatabase } from './db';
import { firearmsFallback, type Firearm } from './data';

type FirearmRow = {
  id: string;
  name: string;
  category: Firearm['category'];
  description: string;
  caliber: string;
  barrel_length: string;
  weight: string;
  magazine_capacity: number;
  muzzle_velocity: string;
  origin: string;
  manufacturer: string;
  year: number;
  type: string;
  action: string;
  safeties: string;
  sight: string;
  color: string;
};

const FIREARM_SELECT = `
  select
    id,
    name,
    category,
    description,
    caliber,
    barrel_length,
    weight,
    magazine_capacity,
    muzzle_velocity,
    origin,
    manufacturer,
    year,
    type,
    action,
    safeties,
    sight,
    color
  from firearms
  order by category, year, name
`;

const FIREARM_SCHEMA = `
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
  )
`;

const FIREARM_INSERT = `
  insert into firearms (
    id,
    name,
    category,
    description,
    caliber,
    barrel_length,
    weight,
    magazine_capacity,
    muzzle_velocity,
    origin,
    manufacturer,
    year,
    type,
    action,
    safeties,
    sight,
    color
  ) values (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
    $11, $12, $13, $14, $15, $16, $17
  ) on conflict (id) do nothing
`;

let initPromise: Promise<void> | null = null;

async function ensureCollectionReady() {
  if (!pool) return;

  if (!initPromise) {
    initPromise = (async () => {
      await pool.query(FIREARM_SCHEMA);

      const existing = await pool.query<{ count: string }>('select count(*)::text as count from firearms');
      if (Number(existing.rows[0]?.count ?? '0') === 0) {
        for (const firearm of firearmsFallback) {
          await pool.query(FIREARM_INSERT, [
            firearm.id,
            firearm.name,
            firearm.category,
            firearm.description,
            firearm.caliber,
            firearm.barrelLength,
            firearm.weight,
            firearm.magazineCapacity,
            firearm.muzzleVelocity,
            firearm.origin,
            firearm.manufacturer,
            firearm.year,
            firearm.specs.type,
            firearm.specs.action,
            firearm.specs.safeties,
            firearm.specs.sight,
            firearm.color,
          ]);
        }
      }
    })();
  }

  await initPromise;
}

function mapRow(row: FirearmRow): Firearm {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    caliber: row.caliber,
    barrelLength: row.barrel_length,
    weight: row.weight,
    magazineCapacity: row.magazine_capacity,
    muzzleVelocity: row.muzzle_velocity,
    origin: row.origin,
    manufacturer: row.manufacturer,
    year: row.year,
    specs: {
      type: row.type,
      action: row.action,
      safeties: row.safeties,
      sight: row.sight,
    },
    color: row.color,
  };
}

export async function getFirearmsCollection(): Promise<Firearm[]> {
  if (!pool) {
    throw new Error('DATABASE_URL is not configured. Point it at your local PostgreSQL instance.');
  }

  await ensureCollectionReady();
  const result = await queryDatabase<FirearmRow>(FIREARM_SELECT);

  if (result.rowCount > 0) {
    return result.rows.map(mapRow);
  }

  throw new Error('The firearms table is empty. Seed your local dataset first.');
}
