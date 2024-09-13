import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TrashBin {
  id: string;
  location: string;
  fillLevel: number;
}

interface ChartComponentProps {
  data: TrashBin[];
}

export default function ChartComponent({ data }: ChartComponentProps) {
  const chartData = {
    labels: data.map(bin => bin.location),
    datasets: [
      {
        label: 'Fill Level',
        data: data.map(bin => bin.fillLevel),
        backgroundColor: data.map(bin =>
          bin.fillLevel > 80000 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)',
        ),
        borderColor: data.map(bin =>
          bin.fillLevel > 80000 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="my-4">
      <h3>Trash Bin Fill Levels</h3>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
}
