import "./styles.css";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [test, settest] = useState("");
  const [paginatedResult, setPaginatedResult] = useState([]);
  function getData() {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((res) => {
        setData(res);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  const getResponse = (result) => {
    if (result.length && result[0] !== undefined) {
      setPaginatedResult(result);
    }
  };

  return (
    <div className="App">
      <Pagination data={data} getResponse={getResponse} />
    </div>
  );
}
