import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    //reduce method 
   // const total = cart.reduce((total,product) => total + product.price ,0);
   let total = 0;
   for(let i=0;i<cart.length;i++){
       const element = cart[i];
       total = total + element.price * element.quantity;
     
   }

   let shipping =0;
   if(total >35){
       shipping =0;
   }
   else if(total >15){
       shipping = 4.88;
   }
   else if(total >0){
        shipping = 12.99;
   }

   const tax = Math.round(total /10);
   const grandTotals = ((total +shipping+tax)).toFixed(2);
   const grandTotal = Number(grandTotals);

   

    return (
        <div>
             <h3>Order Summary : </h3>
             <h4>Items Ordered : {cart.length}</h4>
             <p>Product Cost : {total}</p>
             <p>Shipping Charge : {shipping}</p>
             <p>Tax + VAT : {grandTotal}</p>
             <h4>Total Price : {grandTotal}</h4>
             {
                 props.children
             }
        </div>
    );
};

export default Cart;