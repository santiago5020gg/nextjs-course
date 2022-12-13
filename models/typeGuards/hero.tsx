import { HeroType } from "../interfaces/hero";

export const isHero = (hero: any): hero is HeroType => {
  return (
    (hero as HeroType) &&
    !!(hero as HeroType).price &&
    !!(hero as HeroType).description
  );
};
