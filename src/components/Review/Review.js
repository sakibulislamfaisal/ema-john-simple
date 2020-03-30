import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';

import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
   
    const [cart ,setCart] = useState([]);
    const [orderPlaced , setorderPlaced] = useState(false);

     const handlerOrder = () =>{
           setCart([]);
           setorderPlaced(true);
           processOrder();
     }


    const removeProduct = (keys) =>{
        // console.log('clicked');
         const remove = cart.filter( pd => pd.key !== keys);
         setCart(remove)
         removeFromDatabaseCart(keys);
    }
    useEffect( () => {
         const saveCart = getDatabaseCart();
         const productkeys = Object.keys(saveCart);
         const cartProducts = productkeys.map( key => {

              const products = fakeData.find(pd => pd.key === key);
              products.quantity = saveCart[key];
              return products;
         },[])
         setCart(cartProducts);
    }, [])

    let thankyou ;
    if(orderPlaced){
          thankyou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="shop-container">
            
             <div className="product-container">
             {
                 cart.map( pd =><ReviewItem
                     key={pd.key}
                     product={pd} 
                     removeProduct={removeProduct} >
                        
                     </ReviewItem>)

            }
            {
                 thankyou
            }
             </div>
             <div className="cart-container">
                <Cart cart={cart}>
                <button onClick={handlerOrder} className="main-button">Place Order</button>
                </Cart>
               
             </div>
        </div>
    );
};

export default Review;