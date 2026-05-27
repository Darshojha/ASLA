import HomeClient from '@/components/home-client';
import { getFirearmsCollection } from '@/lib/firearms-service';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let firearms = [];
  let loadError: string | undefined;

  try {
    firearms = await getFirearmsCollection();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : 'The firearm dataset could not be loaded from PostgreSQL.';
  }

  return <HomeClient firearms={firearms} loadError={loadError} />;
}
