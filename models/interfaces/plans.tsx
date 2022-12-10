import { TypePlan } from "../../contexts/plans";

export type Plan = {
    id: string;
    title: TypePlan;
    price: string;
    benefits: string[];
}