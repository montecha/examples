import "./App.css";
import BarChart from "./components/BarChart";

const chartData = [
  {
    xValue: 9,
    yValue: 17,
  },
  {
    xValue: 11,
    yValue: 20,
  },
  {
    xValue: 13,
    yValue: 27,
  },
  {
    xValue: 15,
    yValue: 25,
  },
  {
    xValue: 17,
    yValue: 23,
  },
  {
    xValue: 19,
    yValue: 18,
  },
];

const Home = () => {
  return (
    <div className="App">
      {chartData.length !== 0 && <BarChart chartData={chartData.slice(0, 8)} />}
    </div>
  );
};

export default Home;
