import HomeClient from '@/components/home-client';
import { getFirearmsCollection } from '@/lib/firearms-service';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const firearms = await getFirearmsCollection();

  return <HomeClient firearms={firearms} />;
}
