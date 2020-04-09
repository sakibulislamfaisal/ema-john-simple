import React from 'react';




const Inventory = () => {
      const handleAddProducts = () =>{
    //     const product = fakeData[0];
    //     console.log('Before Insert' ,product);
    //     fetch('https://immense-woodland-40379.herokuapp.com/addProducts' , {
    //         method : 'POST',
    //         body : JSON.stringify(fakeData), 
    //         headers: {
    //                     "Content-type": "application/json; charset=UTF-8"
    //                  }

    //    })
    //    .then(res => res.json())
    //    .then(data => console.log('Insert Successfully',data))
      }
    
    return (
        <div>
            <h1>This is Inventory</h1>
            <button  className="main-button" onClick={handleAddProducts}>Add Product</button>
        </div>
    );
};

export default Inventory;