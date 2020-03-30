import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    // console.log(fakeData); 
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect( () =>{
         const savedCart = getDatabaseCart();
         const productKeys = Object.keys(savedCart);
         const previousKey = productKeys.map( pdKey => {
                 const product = fakeData.find( pd => pd.key === pdKey);
                 product.quantity = savedCart[pdKey];
                 return product;
         })
         setCart(previousKey)
    },[])

    const handleAddProduct = (product) =>{
        //  console.log("product added");
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
             const count  = sameProduct.quantity + 1;
             sameProduct.quantity = count ;
             const others = cart.filter(pd => pd.key !== product.key);
             newCart = [...others , sameProduct];
        }
        else{
             product.quantity = 1;
             newCart = [...cart ,product];
        }
        // const count = sameProduct.length;
        // const newCart = [...cart,product];
        setCart(newCart)
        addToDatabaseCart (product.key , count);
    }
    
    return (
        <div className="shop-container">
            
            <div className="product-container">
            
                {
                     products.map(product => <Product
                         key ={product.key}
                         showAddToCart ={true}
                         product={product} 
                         handleAddProduct = {handleAddProduct}
                         
                         ></Product>)
                }
            
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
               <Link to="/review"> <button className="main-button">Order Review</button></Link>
            </div>
            
        </div>
    );
};

export default Shop;