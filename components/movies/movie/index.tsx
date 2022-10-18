import Image from "next/image";

export const MovieDesign = ({
  title,
  img,
  description,
}: {
  title: string;
  img: string;
  description?: string;
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <Image alt="image" src={img} width="241px" height="350px" />
      {description ? <p>{description}</p> : ""}
    </div>
  );
};
