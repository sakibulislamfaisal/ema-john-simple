import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../Login/useAuth";
import {
  getDatabaseCart,
  clearShoppingCart,
} from "../../utilities/databaseManager";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckOutForm.js/CheckOutForm";
import { useState } from "react";

const Shipment = () => {
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const stripePromise = loadStripe(
    "pk_test_5u4MdV0k3HrcnkqeNfD3MCIF007tWoO0eL"
  );
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setShipInfo(data);
  };

  const handleplaceOrder = (payment) => {
    const saveCart = getDatabaseCart();
    const orderDetail = {
      email: auth.user.email,
      cart: saveCart,
      name: auth.user.name,
      shipment: shipInfo,
      payment: payment,
    };
    //console.log(data)
    fetch("https://ema-john-backend-server.herokuapp.com/orderPlaced", {
      method: "POST",
      body: JSON.stringify(orderDetail),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((order) => {
        setOrderId(order._id);
        clearShoppingCart();
        //  console.log(order);
        //  alert('Order Placed Successfully by Order Id is  : ' + order._id);
        //  processOrder();
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6" style={{ display: shipInfo && "none" }}>
          <h2>Shipment Information</h2>
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="name"
              defaultValue={auth.user.name}
              placeholder="Enter Name"
              ref={register({ required: true })}
            />
            {errors.name && (
              <span className="error">Name field is required</span>
            )}

            <input
              name="email"
              defaultValue={auth.user.email}
              placeholder="Enter Email"
              ref={register({ required: true })}
            />
            {errors.email && (
              <span className="error">Email field is required</span>
            )}

            <input
              name="addressline"
              placeholder="Enter Address"
              ref={register({ required: true })}
            />
            {errors.addressline && (
              <span className="error">Address field is required</span>
            )}

            <input
              name="address"
              placeholder="Enter Extra Address"
              ref={register}
            />

            <input
              name="city"
              placeholder="Enter City"
              ref={register({ required: true })}
            />
            {errors.city && (
              <span className="error">City field is required</span>
            )}

            <input
              name="country"
              placeholder="Enter Country"
              ref={register({ required: true })}
            />
            {errors.country && (
              <span className="error">Country field is required</span>
            )}

            <input
              name="zipcode"
              placeholder="Enter Zipcode"
              ref={register({ required: true })}
            />
            {errors.zipcode && (
              <span className="error">Zipcode field is required</span>
            )}

            <input type="submit" value="Submit" className="main-button" />
          </form>
        </div>

        <div
          className="col-md-6"
          style={{ display: shipInfo ? "block" : "none" }}
        >
          <h2>Payment Information</h2>
          <br />
          <Elements stripe={stripePromise}>
            <CheckoutForm handleplaceOrder={handleplaceOrder}></CheckoutForm>
          </Elements>
          {orderId && (
            <div>
              <h3>Thank you for shopping with us.</h3>
              <p>Your Order Id is : {orderId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shipment;
