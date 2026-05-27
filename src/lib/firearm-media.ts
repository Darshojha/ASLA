import firearmImages from './firearm-images.json';

type FirearmImageEntry = {
  id: string;
  name: string;
  title: string | null;
  imageUrl: string | null;
};

const imageMap = new Map(
  (firearmImages as FirearmImageEntry[]).map((entry) => [entry.id, entry])
);

export const neutralWeaponTone = 'from-zinc-950 via-zinc-800 to-zinc-900';
export const neutralSoftTone = 'from-zinc-800 via-zinc-700 to-zinc-900';

export const categoryHeroIds = {
  pistol: 'glock-17',
  rifle: 'ar-15',
  shotgun: 'mossberg-500',
  sniper: 'remington-700',
  machine: 'm249-saw',
  revolver: 'colt-python',
} as const;

export function getFirearmImage(id: string) {
  return imageMap.get(id)?.imageUrl ?? null;
}

export function getFirearmImageTitle(id: string) {
  return imageMap.get(id)?.title ?? null;
}

export function getCategoryHeroImage(categoryId: keyof typeof categoryHeroIds) {
  const heroId = categoryHeroIds[categoryId];
  return heroId ? getFirearmImage(heroId) : null;
}

export function getCategoryHeroTitle(categoryId: keyof typeof categoryHeroIds) {
  const heroId = categoryHeroIds[categoryId];
  return heroId ? getFirearmImageTitle(heroId) : null;
}
