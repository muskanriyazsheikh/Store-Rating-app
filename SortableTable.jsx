import React, { useState } from "react";

export default function SortableTable({ data = [] }) {
  const [sortConfig, setSortConfig] = useState(null);

  // Ensure data is always an array
  const safeData = Array.isArray(data) ? [...data] : [];

  // Sorting function
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return safeData;

    return [...safeData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [safeData, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="sortable-table">
      <thead>
        <tr>
          {safeData.length > 0 &&
            Object.keys(safeData[0]).map((key) => (
              <th key={key} onClick={() => requestSort(key)}>
                {key}
                {sortConfig && sortConfig.key === key ? (sortConfig.direction === "ascending" ? " 🔼" : " 🔽") : null}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.length === 0 ? (
          <tr>
            <td colSpan="100%">No data available</td>
          </tr>
        ) : (
          sortedData.map((item, index) => (
            <tr key={item.id || item._id || index}>
              {Object.values(item).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
