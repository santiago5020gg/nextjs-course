import Image from "next/image";

export const MovieDesign = ({ title, img }: { title: string; img: string }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Image alt="image" src={img} width='241px' height='350px' />
    </div>
  );
};
