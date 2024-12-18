import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ text1, text2, image, isCsvCard, cardId, isFormCard }) => {
  const [csvData, setcsvData] = useState(null);
  const [isHovered, setisHovered] = useState(false);
  const navigate = useNavigate();

  const fileReader = new FileReader();
  const handleMouseEnter = () => {
    setisHovered(true);
  };
  const handleMouseLeave = () => {
    setisHovered(false);
  };
  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      fileReader.onload = (e) => {
        const content = e.target.result;
        console.log(content);
        const parsedData = parseCSV(content);
        setcsvData(parsedData);
        navigate("/Csv", { state: { csvData: parsedData } });
      };
      fileReader.readAsText(file);
    }
  };

  const parseCSV = (content) => {
    const rows = content.split("\n");
    const cityNames = rows[0].split(",").slice(1);
    const distMatrix = rows
      .slice(1)
      .map((row) => row.split(",").slice(1).map(Number));
    const positions = cityNames.map(() => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
    }));
    return { cityNames, distMatrix, positions };
  };

  return (
    <div
      className={`flex flex-col bg-card rounded-full w-28 h-36 justify-center items-center transition-all duration-500 ${
        isHovered ? "scale-110 transition-all duration-500 bg-white" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className=" font-semibold text-lg ">{text1}</p>
      <p className=" font-semibold text-lg ">{text2}</p>

      <img
        src={image}
        alt=""
        className="w-10 h-10 cursor-pointer mt-2"
        onClick={() => {
          if (isCsvCard) {
            document.getElementById(`file-input-${cardId}`).click();
          } else if (isFormCard) {
            navigate("/form");
          }
        }}
      />
      {isCsvCard && (
        <input
          type="file"
          className="hidden"
          id={`file-input-${cardId}`}
          accept=".csv"
          onChange={handleCsvUpload}
        />
      )}
    </div>
  );
};

export default Card;
