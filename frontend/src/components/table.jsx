import React, { useEffect, useRef, useState } from "react"; 
import { fetchDetections, downloadAllDetectionsReport } from "../api";

const Table = () => {
  const tableRef = useRef(null);
  const [detections, setDetections] = useState([]);

  // Fetch detections on mount
  useEffect(() => {
    const loadDetections = async () => {
      try {
        const data = await fetchDetections();
        setDetections(data.detections || []);
      } catch (err) {
        console.error("Failed to fetch detections:", err.message);
      }
    };
    loadDetections();
  }, []);

  // Initialize DataTable after data is loaded
  useEffect(() => {
    const initializeDataTable = () => {
      if (window.$ && window.$.fn.DataTable) {
        // Destroy existing instance
        if (window.$.fn.DataTable.isDataTable(tableRef.current)) {
          window.$(tableRef.current).DataTable().destroy();
        }

        const table = window.$(tableRef.current).DataTable({
          createdRow: function (row) {
            window.$(row).addClass("selected");
          },
          language: {
            paginate: {
              next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
              previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
            },
          },
        });

        // Row click selection
        table.on("click", "tbody tr", function () {
          const $row = table.row(this).nodes().to$();
          const hasClass = $row.hasClass("selected");
          if (hasClass) {
            $row.removeClass("selected");
          } else {
            $row.addClass("selected");
          }
        });

        // Initialize selectpicker
        if (window.$.fn.selectpicker) {
          window.$(".dataTables_wrapper select").selectpicker();
        }
      } else {
        setTimeout(initializeDataTable, 100);
      }
    };

    if (detections.length > 0) {
      initializeDataTable();
    }

    return () => {
      if (
        window.$ &&
        window.$.fn.DataTable &&
        window.$.fn.DataTable.isDataTable(tableRef.current)
      ) {
        window.$(tableRef.current).DataTable().destroy();
      }
    };
  }, [detections]);


const handleDownload = async () => {
  try {
    await downloadAllDetectionsReport();
  } catch (error) {
    alert("Failed to download report");
  }
};

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Detections</h4>
           <button className="btn btn-primary" onClick={handleDownload}>
  <i className="flaticon-146-download"></i>
  </button>
        </div>
        <div className="card-body">
          <style>
            {`
              table.dataTable tbody td {
                color: #6c757d !important;
              }
              table.dataTable tr.selected td {
                color: #6c757d !important;
              }
            `}
          </style>
          <div className="table-responsive">
            <table
              ref={tableRef}
              id="detectionsTable"
              className="display"
              style={{ minWidth: "845px" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Camera</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {detections.length > 0 ? (
                  detections.map((det, index) => (
                    <tr key={index}>
                      <td>{det.id}</td>
                      <td>{det.camera_id}</td>
                      <td>{new Date(det.detection_start_time).toLocaleString()}</td>
                      <td>{new Date(det.detection_end_time).toLocaleString()}</td>
                      <td>{det.duration.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No detections found
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Camera</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Duration</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Table;
