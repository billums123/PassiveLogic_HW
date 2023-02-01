import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import theme from "../theme";
import "../stylesheets/results.css";
import { HeatTransferResults } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const formatData = (heatTransferResults) => {
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (hours)",
        },
        grid: {
          // color: theme.palette.primary.light,
        },
      },
      y: {
        title: {
          display: true,
          text: "Storage Tank Fluid Temperature (C˚)",
        },
        grid: {
          // color: theme.palette.primary.light,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Storage Tank Fluid Temperature vs. Time",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: `${theme.palette.primary.main}EE`,
        backgroundColor: `${theme.palette.primary.light}AA`,
      },
    ],
  };

  return { chartData, chartOptions };
};

interface ResultsProps {
  heatTransferResults: HeatTransferResults;
}

const Results = ({ heatTransferResults }: ResultsProps) => {
  const { chartData, chartOptions } = formatData(heatTransferResults);
  return (
    <Box component="div" className="results">
      <Line options={chartOptions} data={chartData} />
    </Box>
  );
};

export default Results;
