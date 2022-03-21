import "./App.css";
import { useState, useMemo } from "react";

import Table from "./components/Table";

import { sortRows, loadData } from "./helpers";
import { data, headers } from "./data";

const COUNT_PER_PAGE = 4;
let loadIndex = COUNT_PER_PAGE;

function App() {
  const [columns, setColumns] = useState(headers);
  const [rows, setRows] = useState(loadData([...data], loadIndex));
  const [sortingColumn, setSortingColumn] = useState({
    order: "desc",
    orderBy: "name",
  });
  const [noMoreData, setNoMoreData] = useState(false);

  useMemo(() => {
    sortRows(rows, sortingColumn.orderBy, sortingColumn.order);
  }, [rows, sortingColumn.orderBy, sortingColumn.order]);

  const handleSort = (item) => {
    setSortingColumn((prevSortingColumn) => ({
      order:
        prevSortingColumn.order === "asc" &&
        prevSortingColumn.orderBy === item.dataIndex
          ? "desc"
          : "asc",
      orderBy: item.dataIndex,
    }));

    const newColumns = [...columns].map((column) => {
      if (column.dataIndex === item.dataIndex) {
        column.sorter = true;
        column.order = sortingColumn.order;
      } else column.sorter = false;

      return column;
    });

    setColumns(newColumns);
  };

  const handleSelect = (item) => {
    item.selected = !item.selected;
    setRows([...rows]);
  };

  const handleRemoveSelected = () => {
    const newrows = [...rows].filter((item) => item.selected === false);
    setRows(newrows);
  };

  const handleSelectAll = () => {
    const newrows = [...rows].map((item) => {
      item.selected = true;

      return item;
    });

    setRows(newrows);
  };

  const handleScroll = (e) => {
    const clientHeightRange = [
      e.target.clientHeight,
      e.target.clientHeight + 1,
      e.target.clientHeight - 1,
    ];

    if (
      clientHeightRange.includes(
        e.target.scrollHeight - Math.floor(e.target.scrollTop)
      )
    ) {
      setTimeout(() => {
        loadIndex += COUNT_PER_PAGE;

        if (loadIndex > data.length + 3) {
          loadIndex = data.length;
          setNoMoreData(true);
        } else {
          const loadedData = loadData([...data], loadIndex);
          setRows([...loadedData]);
          e.target.scrollTop = 0;
        }
      }, 3000);
    }
  };

  const handleShowInfo = (item) => {
    alert(item.description);
  };

  return (
    <div className="App">
      <h3>Hi! I am deeply sorry for the styling.</h3>
      {noMoreData ? <p>No more data</p> : null}
      <Table
        headers={columns}
        data={rows}
        onItemClick={(item) => handleSelect(item)}
        onScroll={(e) => handleScroll(e)}
        onFilter={(item) => handleSort(item)}
        onDoubleClick={(item) => handleShowInfo(item)}
      ></Table>
      <div>
        <button onClick={handleRemoveSelected}>Remove Selected</button>
        <button onClick={handleSelectAll}>Select all</button>
      </div>
      <h5>The task has been done in a highly limited time (hours).</h5>
      <h5>
        There are so much issues that would surely solve if there is no time
        limitation.
      </h5>
    </div>
  );
}

export default App;
