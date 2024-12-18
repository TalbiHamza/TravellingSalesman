import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import Csv from "./components/CSV/Csv";
import Form from "./components/Form/Form";
import Solution from "./components/Solution/Solution";
const App = () => {
  return (
    <div className="mt-4 mx-8 p-4 font-playfair">
      <Router>
        <Routes>
          <Route path="/" element={<Main />}></Route>{" "}
          <Route path="/Csv" element={<Csv />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/solution" element={<Solution />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
