import HomeClient from '@/components/home-client';
import { getFirearmsCollection } from '@/lib/firearms-service';

export default async function Home() {
  const firearms = await getFirearmsCollection();

  return <HomeClient firearms={firearms} />;
}
