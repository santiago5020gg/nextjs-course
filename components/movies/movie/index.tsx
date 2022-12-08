import Image from "next/image";
import Link from "next/link";

export const MovieDesign = ({
  title,
  img,
  description,
  id,
}: {
  title: string;
  img: string;
  description?: string;
  id: string;
}) => {
  return (
    <Link href={`/movies/${id}`}>
      <div className='cursor-pointer'>
        <h1>{title}</h1>
        <Image alt="image" src={img} width="241px" height="350px" />
        {description ? <p>{description}</p> : ""}
      </div>
    </Link>
  );
};
