import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import Plot from "react-plotly.js";
import { useState } from "react";

const Csv = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { csvData } = location.state || {};
  console.log(csvData.positions);

  if (!csvData) return <div>no CSV data available</div>;
  const { cityNames, distMatrix, positions } = csvData;

  const renderGraph = () => {
    const edges = [];
    for (let i = 0; i < cityNames.length; i++) {
      for (let j = i + 1; j < cityNames.length; j++) {
        edges.push([i, j]);
      }
    }
    const traceCities = {
      x: positions.map((p) => p.x),
      y: positions.map((p) => p.y),
      mode: "markers",
      type: "scatter",
      text: cityNames,
      marker: { size: 12, color: "blue" },
      name: "Cities",
    };
    const traceEdges = edges.map(([i, j]) => {
      return {
        type: "scatter",
        x: [positions[i].x, positions[j].x],
        y: [positions[i].y, positions[j].y],
        mode: "lines",
        line: { color: "gray", width: 1 },
        name: "Distances",
      };
    });

    return (
      <Plot
        data={[traceCities, ...traceEdges]}
        layout={{
          title: "Cities and Connections",
          showlegend: false,
          xaxis: { range: [0, 1000] },
          yaxis: { range: [0, 1000] },
          hovermode: "closest",
        }}
      />
    );
  };

  const handleSubmit = async () => {
    try {
      // Prepare data to send to Flask API
      const data = {
        cityNames: cityNames, // city names array
        distances: distMatrix, // distances matrix
      };

      // Make POST request to Flask API
      const response = await fetch("http://127.0.0.1:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const resultData = await response.json();
      setResult(resultData.result); // Store the result from Flask API
      navigate("/solution", {
        state: {
          solutionData: resultData,
          data,
          positions: csvData.positions,
        },
      });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-11">
        <table className="table-auto border-collapse border border-gray-300 overflow-auto w-full">
          <thead>
            <tr>
              <th className="bg-card"></th>
              {cityNames.map((city, index) => (
                <th
                  key={index}
                  className="border border-gray-300 p-2 text-center font-semibold text-sm uppercase bg-card"
                >
                  {city}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cityNames.map((city, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="border border-gray-300 p-2 text-left font-medium text-gray-800 bg-card">
                  {city}
                </td>
                {distMatrix[rowIndex].map((dist, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 p-2 text-center font-semibold font-nunito text-gray-600"
                  >
                    {dist.toFixed(0)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center gap-10 mt-10 font-semibold text-xl">
          <button
            className="px-4 py-3 bg-black text-white hover:bg-stone-800 hover:scale-110 duration-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 text-"
            onClick={() => setIsModalOpen(true)} // Close modal when clicked
          >
            visualize Cities
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-white hover:bg-amber-100 hover:scale-110 duration-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 text-"
          >
            Solve the problem{" "}
          </button>
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                {renderGraph()}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Csv;
