import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [inputNumber, setInputNumber] = useState(0);
  const [pastSearchedNumbers, setPastSearchedNumbers] = useState([]);
  const [pastCalculatedValues, setPastCalculatedValues] = useState([]);

  const handleCalcBtnClick = async () => {
    console.log({ inputNumber });
    const res = await axios.post("/api/values", { index: inputNumber });
  };

  const fetchAllValues = async () => {
    const res = await axios.get("/api/values/all");
    setPastSearchedNumbers(res.data);
  };

  const fetchCalculation = async () => {
    const res = await axios.get("/api/values/current");
    console.log("hey", res.data);
    setPastCalculatedValues(res.data);
  };

  useEffect(() => {
    fetchAllValues();
    fetchCalculation();
  }, []);

  return (
    <>
      <div className="container">
        Enter a number
        <input
          type="number"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.valueAsNumber)}
        />
        <button onClick={handleCalcBtnClick}>Calculate</button>
      </div>
      <div className="container">
        Indexes I have seen
        <div>{pastSearchedNumbers.map((num) => num.number).join(" ")}</div>
      </div>
      <div className="container">
        Calculated Results
        <div>
          {Object.entries(pastCalculatedValues).map((pair) => {
            console.log("pair", pair);
            return (
              <>
                {`${pair[0]} : ${pair[1]}`}
                <br />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
