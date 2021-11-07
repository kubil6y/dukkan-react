import { FC } from "react";
import { useParams } from "react-router-dom";

interface IParams {
  slug: string;
}

export const ProductDetailsPage: FC = () => {
  const { slug } = useParams<IParams>();
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
};
