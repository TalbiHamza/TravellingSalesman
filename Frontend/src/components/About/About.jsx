import Navbar from "./../Navbar/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen grid grid-cols-2">
        <div className="flex flex-col gap-20 mt-36">
          <div>
            <p className="font-playfair font-bold text-5xl pb-4">
              The Traveling Salesman Problem (TSP)
            </p>
            <p className="font-playfair font-semibold text-xl leading-8">
              The Traveling Salesman Problem (TSP) is a classic optimization
              problem in operational research. It seeks to find the shortest
              possible route for a salesman to visit each of a given set of
              cities exactly once and return to the starting city. TSP is an
              NP-hard problem, meaning it is computationally difficult to solve
              as the number of cities increases.
            </p>
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

export default About;
