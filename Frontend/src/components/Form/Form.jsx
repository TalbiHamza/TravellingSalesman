import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [step, setStep] = useState(1); // Track current form step
  const [numCities, setNumCities] = useState(0); // Number of cities
  const [cityNames, setCityNames] = useState([]); // Array of city names
  const [distances, setDistances] = useState([]); // Distance matrix
  const [result, setResult] = useState(null); // State to store the result

  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step === 1 && numCities > 1) {
      setCityNames(Array(numCities).fill(""));
      setDistances(
        Array(numCities)
          .fill(null)
          .map(() => Array(numCities).fill(0))
      );
      setStep(2);
    } else if (step === 2 && cityNames.every((name) => name.trim() !== "")) {
      setStep(3);
    }
  };

  // Handle changes in city names
  const handleCityNameChange = (index, value) => {
    const updatedCityNames = [...cityNames];
    updatedCityNames[index] = value;
    setCityNames(updatedCityNames);
  };

  // Handle changes in distances
  const handleDistanceChange = (i, j, value) => {
    const updatedDistances = [...distances];
    updatedDistances[i][j] = parseFloat(value) || 0;
    updatedDistances[j][i] = parseFloat(value) || 0; // Symmetric
    setDistances(updatedDistances);
  };

  const positions = cityNames.map(() => ({
    x: Math.random() * 1000,
    y: Math.random() * 1000,
  }));

  const handleSubmit = async () => {
    try {
      // Prepare data to send to Flask API
      const data = {
        cityNames: cityNames, // city names array
        distances: distances, // distances matrix
      };
      console.log(distances);
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
      setResult(resultData.result);
      navigate("/solution", {
        state: {
          solutionData: resultData,
          data,
          positions,
        },
      });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen grid grid-cols-2">
        <div className="flex justify-center items-center mb-28 ">
          <div className="bg-card overflow-y-auto max-h-[70vh] rounded-lg shadow-2xl p-8 max-w-xl w-full transform  transition-all duration-700 ease-out hover:scale-110 hover:shadow-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Choose your cities
            </h2>

            {step === 1 && (
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Enter the number of cities:
                </label>
                <input
                  type="number"
                  value={numCities || ""}
                  onChange={(e) => setNumCities(parseInt(e.target.value, 10))}
                  placeholder="Number of cities"
                  min="2"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={handleNextStep}
                  disabled={numCities < 2}
                  className="mt-4 w-full bg-cyan-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Enter the names of the cities:
                </label>
                {cityNames.map((name, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        handleCityNameChange(index, e.target.value)
                      }
                      placeholder={`City ${index + 1}`}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                ))}
                <button
                  onClick={handleNextStep}
                  disabled={cityNames.some((name) => name.trim() === "")}
                  className="mt-4 w-full bg-cyan-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Enter the distances between cities:
                </label>
                <div className="overflow-x-auto mb-1">
                  <table className="table-auto w-full border-collapse border border-orange-500">
                    <thead>
                      <tr>
                        <th className="p-2 border border-orange-500 "></th>
                        {cityNames.map((name, index) => (
                          <th
                            key={index}
                            className="p-2 border border-orange-500 text-center"
                          >
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cityNames.map((_, i) => (
                        <tr key={i}>
                          <th className="p-2 border border-orange-500 text-center">
                            {cityNames[i]}
                          </th>
                          {cityNames.map((_, j) => (
                            <td
                              key={j}
                              className="p-2 border border-orange-500"
                            >
                              {i === j ? (
                                "-"
                              ) : (
                                <input
                                  type="number"
                                  value={distances[i][j] || ""}
                                  onChange={(e) =>
                                    handleDistanceChange(i, j, e.target.value)
                                  }
                                  placeholder="Distance"
                                  min="0"
                                  className="w-full min-w-16 p-2 border border-lime-600 rounded-md shadow-sm focus:ring-lime-800 focus:border-lime-800"
                                />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  Solve the problem
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center mb-32 mr-40">
          <img
            src="/assets/travelling.png"
            alt=""
            className="w-[400px] h-[300px] hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>
    </>
  );
};

export default Form;
