import { getHeroFromMongoDb } from "../lib/mongodb/plan";
import { HeroType } from "../models/interfaces/hero";
import { isHero } from "../models/typeGuards/hero";

export const getHero = async (): Promise<HeroType> => {
  const customObj = { price: "0", description: "No hero" };
  try {
    const findResult = await getHeroFromMongoDb();
    if (!isHero(findResult)) {
      return customObj;
    }
    return { price: findResult.price, description: findResult.description };
  } catch (error) {
    console.log("Something went wrong. getHero", error);
    return customObj;
  }
};
