import { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { includes } from "../helpers";

interface IParams {
  slug: string;
}
const items = ["furniture", "beauty", "deals", "electronics"];

export const CategoryPage: FC = () => {
  const { slug } = useParams<IParams>();
  const history = useHistory();

  // TODO hardcoded values... (wont be dynamic!)
  const isValidName = includes(items, slug.toLowerCase());
  if (!isValidName) {
    history.push("/");
  }

  return (
    <div>
      <h1>category page</h1>
      <h1>{slug}</h1>
    </div>
  );
};
