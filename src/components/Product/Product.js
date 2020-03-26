import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    //console.log(props.product);
     const {name , img ,seller , price , stock} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name">{name}</h4><br/>
                <p><small>By :{seller}</small></p>
                <p>Price : ${price}</p>
                <p><small>Stock : {stock} Only left to Stock Order-soon</small></p>
                <button className="main-button"
                     onClick={ () => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;