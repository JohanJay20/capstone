import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { fetchGroupedDetections, downloadGroupedDetectionsReport } from "../api";


const MarketOverview = ({ showDownloadButton = false }) => {
  const [view, setView] = useState("week");
  const [groupedDataWeek, setGroupedDataWeek] = useState([]);
  const [groupedDataMonth, setGroupedDataMonth] = useState([]);

  useEffect(() => {
    const loadGroupedData = async () => {
      const weekData = await fetchGroupedDetections("week");
      setGroupedDataWeek(weekData || []);

      const monthData = await fetchGroupedDetections("month");
      setGroupedDataMonth(monthData || []);
    };

    loadGroupedData();

    const intervalId = setInterval(loadGroupedData, 10000);
    return () => clearInterval(intervalId);
  }, []);

const handleDownloadGrouped = async () => {
  try {
    await downloadGroupedDetectionsReport(view);
  } catch {
    alert("Failed to download grouped report");
  }
};
  const data = view === "week" ? groupedDataWeek : groupedDataMonth;

  // Transform backend data → ApexCharts expects categories + series
  const categories = data.map((item) => item.period);
  const series = [
    {
      name: "Detections",
      data: data.map((item) => item.count),
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
    },
    colors: ["#00ADA3"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    legend: { show: false },
    grid: {
      show: false,
      strokeDashArray: 6,
      borderColor: "#dadada",
    },
    yaxis: {
      labels: {
        style: {
          colors: "#B5B5C3",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 400,
        },
        formatter: (value) => value.toString()
      },
    },
    xaxis: {
      categories,
      tickAmount: 10,
      labels: {
        style: {
          colors: "#B5B5C3",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 400,
        },
      },
    },
    fill: {
      type: "solid",
      opacity: 0.05,
    },
    tooltip: {
      x: { format: "dd/MM/yy HH:mm" },
    },
  };

  return (
    <div className="col-xl-9 col-xxl-8">
      <div className="card">
        <div className="card-header border-0 flex-wrap pb-0">
          <div className="mb-3">
            <h4 className="fs-20 text-black">Detections Overview</h4>
            <p className="mb-0 fs-12 text-black">Grouped detections by {view}</p>
          </div>
<div className="d-flex justify-content-end">
  <select
    className="style-1 btn-secondary default-select mr-2"
    value={view}
    onChange={(e) => setView(e.target.value)}
  >
    <option value="week">Weekly</option>
    <option value="month">Monthly</option>
  </select>
{showDownloadButton && (
  <button className="btn btn-primary" onClick={handleDownloadGrouped}>
    <i className="flaticon-146-download"></i>
  </button>
)}
  </div>

        </div>

        <div className="card-body pb-2 px-3">
          <Chart options={options} series={series} type="area" height={350} />
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
