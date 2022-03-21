import React from "react";
import TableData from "./TableData";
import TableHeader from "./TableHeader";

function Table({
  headers,
  data,
  onItemClick,
  onFilter,
  onScroll,
  onDoubleClick,
}) {
  return (
    <div className="tableFixHead" onScroll={(e) => onScroll(e)}>
      <table>
        <TableHeader headers={headers} onFilter={onFilter}></TableHeader>
        <TableData
          data={data}
          onItemClick={onItemClick}
          onDoubleClick={onDoubleClick}
        ></TableData>
      </table>
    </div>
  );
}

export default Table;
