import { useEffect, useState, useRef } from "react";
import refreshImg from "./refresh_icon.svg";

const ServerContent = () => {
  const [numberList, setNumberList] = useState([
    { num: 0, id: 0 },
    { num: 2, id: 1 },
  ]);

  let spinnerRef = useRef(null);

  async function fetchData() {
    console.log("Fetching data from server");
    // Start the spinner
    spinnerRef.current.classList.add("animate-spin");

    const numListReq = await fetch("/api/calculations");
    const numListJson = await numListReq.json();
    let numList = [];
    numListJson.forEach((num) => {
      numList.push(num);
    });

    setNumberList(numList);

    console.log("Fetched data from server");
    // Stop the spinner
    spinnerRef.current.classList.remove("animate-spin");
  }

  useEffect(() => {
    fetchData();
  }, []);

  const numberItems = numberList.map((numObj) => <li key={numObj.id}>{numObj.num}</li>);

  return (
    <>
      <div className="numbers">
        <h3>
          <div className="flex">
            <img ref={spinnerRef} src={refreshImg} className="my-auto mx-2 cursor-pointer w-4 h-4" onClick={fetchData}></img>
            <span>Server Content - Numbers Calculated So Far</span>
          </div>
        </h3>
        <div className="numbers-list">
          <ul>{numberItems}</ul>
        </div>
      </div>
    </>
  );
};

export { ServerContent };
