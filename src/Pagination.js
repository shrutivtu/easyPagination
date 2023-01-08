import React, { useEffect, useState } from "react";
import "./pagination.css";

const Pagination = ({ data, getResponse }) => {
  const [rvalue, setRvalue] = useState(5);
  const [current, setCurrent] = useState(1);
  const [pages, setPages] = useState(0);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getResponse(response);
  }, [response]);

  useEffect(() => {
    console.log(current);
    let res = [];
    if (current === 1) {
      for (let i = 0; i < rvalue; i++) {
        res.push(data[i]);
      }
    } else if (current === pages) {
      const start = rvalue * (current - 1) + 1;
      for (let i = start - 1; i <= data.length - 1; i++) {
        res.push(data[i]);
      }
    } else {
      const start = rvalue * (current - 1) + 1;
      const end = +start + +rvalue;
      for (let i = start - 1; i < end - 1; i++) {
        res.push(data[i]);
      }
    }
    setResponse(res);
  }, [rvalue, current, pages]);

  useEffect(() => {
    let size = data.length;
    if (size % rvalue === 0) {
      setPages(size / rvalue);
    } else setPages(Math.ceil(size / rvalue));
    setCurrent(1);
  }, [data, rvalue]);

  const handlePagePrevChange = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  const handleNextPageChange = () => {
    if (current < pages) {
      setCurrent(current + 1);
    }
  };
  return (
    <section className="pagination">
      <div className="rowsSelection">
        <select value={rvalue} onChange={(e) => setRvalue(e.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="left" onClick={handlePagePrevChange}>
        <div>
          <span>{`<`}</span>
        </div>
      </div>
      <div className="middle">
        <span>
          <input
            className="pageInput"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />{" "}
          of {pages}
        </span>
      </div>
      <div className="right" onClick={handleNextPageChange}>
        <div>
          <span>{`>`}</span>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
