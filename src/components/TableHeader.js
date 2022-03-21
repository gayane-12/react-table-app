import React from "react";

function TableHeader({ headers, onFilter }) {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={header.dataIndex}
            onClick={() => onFilter(header)}
          >
            {header.title}
            {header.sorter ? (
              <span>{header.order === "asc" ? "🔺" : "🔻"}</span>
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
