import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart() {
  return (
    <div>
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Tinggi Tanaman",
            },
          },
        }}
        data={{
          labels: ["januari", "februari", "maret", "april", "mei"],
          datasets: [
            {
              label: "Tinggi Tanaman",
              data: [1, 5, 6, 2, 5],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
}

export default Chart;
