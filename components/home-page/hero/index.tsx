import { HeroType } from "../../../models/interfaces/hero";

export const Hero = ({ price, description }: HeroType) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div>{description}</div>
      <div>
        <div>Los planes empiezan desde</div>
        <div>${price}/mes*</div>
      </div>
    </div>
  );
};
