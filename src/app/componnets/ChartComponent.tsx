import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TrashBin {
  id: string;
  location: string;
  fillLevel: number;
}

interface ChartComponentProps {
  data: TrashBin[];
}

export default function ChartComponent({ data }: ChartComponentProps) {
  return (
    <div className="my-4">
      <h3>Trash Bin Fill Levels</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="fillLevel">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fillLevel > 80000 ? "#ff0000" : "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
