import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const Date_Finanzas_2 = () => {
  const data = {
    labels: ["Barra1", "Barra2", "Barra3", "Barra4", "Barra4", "Barra4"],
    data: [100, 300, 200, 500],
    datasets: [
      {
        label: "Branch",
        data: [100, 300, 100, 500, 100, 700],
        backgroundColor: "#6366f1",
        borderRadius: 10,
        barThickness: 5,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-auto h-[90%] border border-gray-300 rounded-lg  shadow-xl">
      <h3 className="font-bold text-[1.2rem] pb-2">Finanzas 2</h3>
      <p className="text-[13px] text-gris">Datos de Finanzas</p>

     <div className="mb-10 pb-2">
     <Bar data={data} options={options} />
     </div>
    </div>
  );
};
