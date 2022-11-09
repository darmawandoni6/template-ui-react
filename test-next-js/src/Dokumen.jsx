import axios from "axios";
import React from "react";

const Dokumen = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
      const { results } = res.data;
      setData(results);
    });
  }, []);
  return (
    <div>
      <h1>Dokumen</h1>
      <ol>
        {data.map((item) => (
          <li key={item.url}>{item.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default Dokumen;
