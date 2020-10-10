import React from "react";
import fakeData from "../../fakeData";

const Inventory = () => {
  const handleAddProducts = () => {
    const product = fakeData;
    console.log("Before Insert", product);
    fetch("https://ema-john-backend-server.herokuapp.com/addProducts", {
      method: "POST",
      body: JSON.stringify(fakeData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("Insert Successfully", data));
  };

  return (
    <div>
      <h1>This is Inventory</h1>
      <button disabled className="main-button" onClick={handleAddProducts}>
        Add Product
      </button>
    </div>
  );
};

export default Inventory;
