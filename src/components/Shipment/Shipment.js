import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const auth = useAuth();
    const { register, handleSubmit,  errors } = useForm();
  const onSubmit = data => { console.log(data) }



  return (
   
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
   

      <input  name="name" defaultValue={auth.user.name} placeholder="Enter Name" ref={register({ required: true })} /> 
      {
       errors.name && <span className="error">Name  field is required</span>
      }

      <input name="email" defaultValue={auth.user.email} placeholder="Enter Email" ref={register({ required: true })} /> 
      {
      errors.email && <span className="error">Email  field is required</span>
      }

      <input name="addressline" placeholder="Enter Address" ref={register({ required: true })} /> 
      {errors.addressline && <span className="error">Address  field is required</span>}

      <input name="address" placeholder="Enter Extra Address" ref={register} /> 

      
      <input name="city" placeholder="Enter City" ref={register({ required: true })} /> 
      {errors.city && <span className="error">City  field is required</span>}

      <input name="country" placeholder="Enter Country" ref={register({ required: true })} /> 
      {errors.country && <span className="error">Country  field is required</span>}

      <input name="zipcode" placeholder="Enter Zipcode" ref={register({ required: true })} /> 
      {errors.zipcode && <span className="error">Zipcode  field is required</span>}
      
      <input type="submit" value="Submit" className="main-button" />
    </form>
  )
};

export default Shipment;