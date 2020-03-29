import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const { name ,quantity, key} = props.product;
    return (
        <div className="review-item">
            <h4>Product name :{name}</h4>
            <p>quantity : {quantity}</p>
            <button className="main-button" 
                   onClick={ () => props.removeProduct(key)}
            >Remove Item</button>
        </div>
    );
};

export default ReviewItem;