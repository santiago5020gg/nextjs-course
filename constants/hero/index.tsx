import { HeroType } from "../../models/interfaces/hero";
import HeroJson from "../hero/index.json";

export const HeroConstant: HeroType[] = HeroJson as unknown as HeroType[];
