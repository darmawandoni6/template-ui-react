import React from "react";
import { useDispatch, useSelector } from "react-redux";
import componentsAction from "./data/components.action";

const Components = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.components);

  React.useEffect(() => {
    dispatch(componentsAction.getDummyPost());
  }, []);
  if (loading) return <h1>loading</h1>;
  return (
    <ol>
      {data.map((item) => (
        <li key={item.id}>
          <p>{item.title}</p>
          <p>{item.body}</p>
        </li>
      ))}
    </ol>
  );
};

export default Components;
