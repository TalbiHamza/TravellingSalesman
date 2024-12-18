import Card from "../Card/Card";
import Navbar from "./../Navbar/Navbar";
const Main = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen grid grid-cols-2">
        <div className="flex flex-col gap-20 mt-36">
          <div>
            <p className="font-playfair font-bold text-5xl pb-4">Optimizing </p>
            <p className="font-playfair font-bold text-5xl pb-5">
              Every Journey{" "}
            </p>
            <p className="font-playfair font-semibold text-xl">
              One Node at a Time
            </p>
          </div>

          <div className="flex gap-16 ml-40">
            <Card
              text1="Import CSV"
              image="/assets/csv.png"
              isCsvCard={true}
              cardId={1}
            ></Card>
            <Card
              text1="Choose"
              text2="your cities"
              image="/assets/choice.png"
              isFormCard={true}
              cardId={2}
            ></Card>
          </div>
        </div>
        <div className="flex justify-center items-center mb-32 mr-40">
          <img
            src="/assets/thinking.png"
            alt=""
            className="w-[450px] h-[450px] hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>
    </>
  );
};

export default Main;
