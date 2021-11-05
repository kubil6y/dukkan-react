import { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { includes } from "../helpers";

interface IParams {
  name: string;
}
const items = ["furniture", "beauty", "deals"];

export const CategoryPage: FC = () => {
  const { name } = useParams<IParams>();
  const history = useHistory();

  // TODO hardcoded values...
  const isValidName = includes(items, name.toLowerCase());
  if (!isValidName) {
    history.push("/");
  }

  return (
    <div>
      <h1>category page</h1>
      <h1>{name}</h1>
    </div>
  );
};
