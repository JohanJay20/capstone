
import StatisticCard from "../components/statisticCard";
import MarketOverview from "../components/marketOverview";
import CurrentGraph from "../components/currentGraph";


const Dashboard = () => {
 





  return (
    <>
      <div className="container-fluid">
        <div className="form-head mb-sm-5 mb-1 d-flex flex-wrap align-items-center">
          <h2 className="font-w600 title mb-1 mr-auto ">Dashboard</h2>
        </div>
        
        <StatisticCard  />
        <div className="row">
          <MarketOverview />
          <CurrentGraph />
        </div>
      </div>
    </>
  );
};

export default Dashboard;