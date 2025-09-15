import React from "react";
import Table from "../components/table";
import MarketOverview from "../components/marketOverview";
import CurrentGraph from "../components/currentGraph";
const Reports = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="form-head mb-sm-5 mb-3 d-flex flex-wrap align-items-center">
          <h2 className="font-w600 title mb-2 mr-auto">Reports</h2>
        </div>
       
        <div className="row">
           <MarketOverview showDownloadButton={true}/>
          <CurrentGraph showDownloadButton={true}/>
           <Table />
         
        </div>
        
      </div>
    </>
  );
};

export default Reports;