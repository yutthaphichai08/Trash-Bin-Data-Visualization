import React from "react";

interface TrashBin {
  id: string;
  location: string;
  fillLevel: number;
}

interface TableComponentProps {
  bins: TrashBin[];
}

export default function TableComponent({ bins }: TableComponentProps) {
  return (
    <>
      <h2 className="my-4">Trash Bins List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Location</th>
            <th>Fill Level</th>
            <th>Bin ID</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin) => (
            <tr
              key={bin.id}
              className={bin.fillLevel >= 80000 ? "table-danger" : ""} 
            >
              <td>{bin.location}</td>
              <td>{bin.fillLevel}%</td>
              <td>{bin.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
