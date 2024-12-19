import React from "react";
import { useLocation } from "react-router-dom";
import Plot from "react-plotly.js";
import Navbar from "../Navbar/Navbar";

const SolutionPage = () => {
  const { state } = useLocation();
  const resultData = state?.solutionData?.result;
  const cityNames = state?.data?.cityNames || [];
  const optimizedRoute = resultData?.tour || []; // This should now be an array of city names
  const totalDistance = resultData?.cost || 0;
  const positions = state?.positions;

  // Check if optimizedRoute has valid data
  if (!optimizedRoute || optimizedRoute.length === 0) {
    return <div>No optimized route available</div>;
  }

  // Ensure that the optimizedRoute is directly made of city names
  const optimizedRouteNames = optimizedRoute.map((city) =>
    cityNames.find((name) => name === city)
  );

  // Generate random coordinates for cities (for plotting purposes)
  /*const n = cityNames.length;
  const x_coords = Array.from({ length: n }, () => Math.random());
  const y_coords = Array.from({ length: n }, () => Math.random());*/

  // Prepare data for Plotly
  const plotData = [
    {
      x: positions.map((p) => p.x),
      y: positions.map((p) => p.y),
      mode: "markers+text",
      type: "scatter",
      text: cityNames,
      textposition: "top right",
      marker: { color: "red", size: 10 },
    },
    {
      x: [],
      y: [],
      mode: "lines+text",
      type: "scatter",
      line: { color: "blue", width: 2 },

      showlegend: false,
    },
  ];

  // Add lines between cities based on optimized route
  optimizedRoute.forEach((city, i) => {
    const currentCityIndex = cityNames.indexOf(city);
    const nextCityIndex = cityNames.indexOf(
      optimizedRoute[i + 1] || optimizedRoute[0]
    );
    plotData[1].x.push(
      positions[currentCityIndex].x,
      positions[nextCityIndex].x
    );
    plotData[1].y.push(
      positions[currentCityIndex].y,
      positions[nextCityIndex].y
    );
  });

  return (
    <>
      <Navbar></Navbar>
      <div className="h-screen grid grid-cols-2 max-w-[1400px]">
        <div className="flex flex-col mt-36">
          <h2 className="text-4xl font-bold mb-6">
            Optimized Route and Total Distance
          </h2>

          {/* Display Optimized Route */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-blue-800">
              Optimized Route:
            </h3>
            <p className="text-lg font-bold">
              {optimizedRouteNames.join(" → ")}
            </p>
          </div>

          {/* Display Total Distance */}
          <div>
            <h3 className="text-2xl font-bold text-blue-800">
              Total Distance:
            </h3>
            <p className="text-lg font-bold">
              {totalDistance.toFixed(2)} kilometers
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center mb-32">
          <Plot
            data={plotData}
            layout={{
              title: "Optimal TSP Tour",
              showlegend: false,
              paper_bgcolor: "#FFF3E0", // Background of the entire plot
              plot_bgcolor: "#F5F5DC", // Background of the graphing area
              xaxis: {
                showgrid: false,
                zeroline: false,
              },
              yaxis: {
                showgrid: false,
                zeroline: false,
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SolutionPage;
