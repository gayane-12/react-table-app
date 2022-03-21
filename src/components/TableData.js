import React from "react";

function TableData({ data, onItemClick, onDoubleClick }) {
  return (
    <tbody>
      {data.map((item) => (
        <tr
          key={item.id}
          onClick={() => onItemClick(item)}
          onDoubleClick={() => onDoubleClick(item)}
          style={
            item.selected
              ? {
                  background: "#c4bdc7",
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
                }
              : null
          }
        >
          <td>{item.name}</td>
          <td>{item.rate}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableData;
