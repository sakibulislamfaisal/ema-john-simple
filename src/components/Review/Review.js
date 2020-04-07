import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
// import { auth } from 'firebase';
import { useAuth } from '../Login/useAuth';

const Review = () => {

     const auth = useAuth();
   
    const [cart ,setCart] = useState([]);
    //const [orderPlaced , setorderPlaced] = useState(false);

     // const handlerOrder = () =>{
     //       setCart([]);
     //       setorderPlaced(true);
     //       processOrder();
     // }


    const removeProduct = (keys) =>{
        // console.log('clicked');
         const remove = cart.filter( pd => pd.key !== keys);
         setCart(remove)
         removeFromDatabaseCart(keys);
    }
    useEffect( () => {
         const saveCart = getDatabaseCart();
         const productkeys = Object.keys(saveCart);
         fetch('http://localhost:4200/getProductsByKey',{
          method : 'POST',
          body : JSON.stringify(productkeys), 
          headers: {
                      "Content-type": "application/json; charset=UTF-8"
                   }
               })
         .then(res => res.json())
         .then(data => {
              
               const cartProducts = productkeys.map( key => {

               const products = data.find(pd => pd.key === key);
               products.quantity = saveCart[key];
               return products;
          },[])
          setCart(cartProducts);
              
         })
        
    }, [])

//     let thankyou ;
//     if(orderPlaced){
//           thankyou = <img src={happyImage} alt=""/>
//     }
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
                  !cart.length && <h3>Your Cart is Empty . <a href="/shop">Keep Shopping</a></h3>
            }
             </div>
             <div className="cart-container">
                <Cart cart={cart}>
                  
                        <Link to="/shipment"> 
                        {
                 auth.user ?  <button  className="main-button">Proceed to CheckOut</button> :<button  className="main-button">Login to Proceed</button>
                        }
                        </Link>
                        
                  
                </Cart>
               
             </div>
        </div>
    );
};

export default Review;