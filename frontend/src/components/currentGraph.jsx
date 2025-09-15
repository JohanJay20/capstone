import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { fetchWeekdaysStats, downloadWeekdaysReport } from "../api";

const CurrentGraph = ({ showDownloadButton = false }) => {
	const [weekdaysStats, setWeekdaysStats] = useState([]);

	useEffect(() => {
		const loadWeekdays = async () => {
			const res = await fetchWeekdaysStats();
			if (res && res.weekdays) {
				const normalized = res.weekdays.map(item => ({
					day: item.weekday, // weekday name
					count: item.count,
				}));
				setWeekdaysStats(normalized);
			}
		};

		loadWeekdays();
		const intervalId = setInterval(loadWeekdays, 10000);
		return () => clearInterval(intervalId);
	}, []);

const handleDownloadWeekdays = async () => {
  try {
    await downloadWeekdaysReport();
  } catch {
    alert("Failed to download weekdays report");
  }
};

	const categories = weekdaysStats.map((item) => item.day);
	const values = weekdaysStats.map((item) => Number(item.count));

	const options = {
		chart: {
			type: "donut",
			height: 200,
		},
		dataLabels: { enabled: false },
		stroke: { width: 0 },
		colors: [
			"#6418C3",
			"#FFAB2D",
			"#eb8153",
			"#00ADA3",
			"#68CF29",
			"#FF4C41",
			"#51A6F5",
		],
		legend: {
			position: "bottom",
			show: true,
		},
		labels: categories,
		responsive: [
			{
				breakpoint: 768,
				options: {
					chart: { width: 200 },
				},
			},
		],
	};

	return (
		<div className="col-xl-3 col-xxl-4">
			<div className="card">
				<div className="card-header border-0">
					<h4 className="mb-0 text-black fs-20">Weekdays Detection</h4>
					

  {showDownloadButton && (
  <button className="btn btn-primary" onClick={handleDownloadWeekdays}>
  <i className="flaticon-146-download"></i>
  </button>
)}
				</div>
				<div className="card-body text-center">
					<div className="d-inline-block">
						<Chart
							options={options}
							series={values}
							type="donut"
							height={350}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentGraph;
