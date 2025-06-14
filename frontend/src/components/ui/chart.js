import React, {
  useContext,
  createContext,
  useMemo,
  forwardRef,
} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut, Pie, Radar, PolarArea } from "react-chartjs-2";

import { cn } from "../../lib/utils"; // adjust the path if needed

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the themes (for dark/light mode support)
const THEMES = { light: "", dark: ".dark" };

// Context for accessing chart config
const ChartContext = createContext(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

// Chart container component
const ChartContainer = forwardRef(
  (
    {
      id,
      className,
      children,
      config,
      data,
      options,
      type = "line",
      ...props
    },
    ref
  ) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    // Apply color config to each dataset
    const datasetsWithColors = useMemo(() => {
      return (
        data.datasets?.map((dataset) => {
          const key = typeof dataset.label === "string" ? dataset.label : undefined;
          if (!key) return dataset;

          const conf = config[key];
          if (!conf) return dataset;

          const color =
            conf.theme?.[document.body.classList.contains("dark") ? "dark" : "light"] ||
            conf.color;

          return {
            ...dataset,
            backgroundColor: color,
            borderColor: color,
          };
        }) || []
      );
    }, [data.datasets, config]);

    const dataWithColors = { ...data, datasets: datasetsWithColors };

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn("flex aspect-video justify-center text-xs", className)}
          {...props}
        >
          {{
            line: <Line data={dataWithColors} options={options} />,
            bar: <Bar data={dataWithColors} options={options} />,
            doughnut: <Doughnut data={dataWithColors} options={options} />,
            pie: <Pie data={dataWithColors} options={options} />,
            radar: <Radar data={dataWithColors} options={options} />,
            polarArea: <PolarArea data={dataWithColors} options={options} />,
          }[type]}
        </div>
      </ChartContext.Provider>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

// Helper: Extract config based on dataset label
const getPayloadConfigFromPayload = (config, datasetLabel) => {
  if (!datasetLabel) return undefined;
  return config[datasetLabel];
};

// Chart options generator with custom tooltip/legend logic
function getChartOptions(config) {
  return {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
        external: function (context) {
          // Custom tooltip logic can be implemented here
        },
      },
      legend: {
        display: true,
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets.map((ds, i) => {
              const conf = getPayloadConfigFromPayload(config, ds.label);
              return {
                text: conf?.label || ds.label || "",
                fillStyle: ds.backgroundColor || "gray",
                hidden: false,
                index: i,
              };
            });
          },
        },
      },
    },
  };
}

export {
  ChartContainer,
  ChartContext,
  useChart,
  getPayloadConfigFromPayload,
  getChartOptions,
};
